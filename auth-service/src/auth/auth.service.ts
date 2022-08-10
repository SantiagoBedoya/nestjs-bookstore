import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignInDto } from './dto/sign-in.dto';
import { User, UserDocument } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { IJwtPayload } from './types';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import { ConfigService } from '@nestjs/config';
import { SqsService } from '@ssut/nestjs-sqs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly sqsService: SqsService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const hash = bcrypt.hashSync(signUpDto.password);
    let user: User;
    try {
      user = await this.findByEmail(signUpDto.email);
    } catch (error) {}

    if (user) {
      throw new BadRequestException(
        `email "${signUpDto.email}" is already in use`,
      );
    }
    user = await this.userModel.create({
      ...signUpDto,
      password: hash,
    });
    await this.sqsService.send(this.configService.get<string>('EMAIL_QUEUE'), {
      id: 'id',
      body: JSON.stringify({
        email: user.email,
        type: 'EMAIL_VERIFICATION',
      }),
    });
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException();
    return user;
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.findByEmail(signInDto.email);
    if (!bcrypt.compareSync(signInDto.password, user.password)) {
      throw new UnauthorizedException();
    }
    const token = this.getJwtToken({
      audience: this.configService.get<string>('JWT_AUDIENCE'),
      issuer: this.configService.get<string>('JWT_ISSUER'),
      subject: user._id,
    });
    return token;
  }

  private async getJwtToken(payload: IJwtPayload) {
    return this.jwtService.sign(payload);
  }
}
