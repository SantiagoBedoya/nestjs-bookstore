import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book, BookDocument } from './entities/book.entity';
import slugify from 'slugify';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name)
    private readonly bookModel: Model<BookDocument>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const book = await this.bookModel.create({
      ...createBookDto,
      slug: this.getSlugByTitle(createBookDto.title),
    });
    return book;
  }

  async findAll() {
    const books = await this.bookModel.find();
    return books;
  }

  async findOne(id: string) {
    const book = await this.bookModel.findById(id);
    if (!book) throw new NotFoundException();
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const book = await this.findOne(id);
    await this.bookModel.updateOne(
      {
        _id: book._id,
      },
      updateBookDto,
    );
  }

  async remove(id: string) {
    const book = await this.findOne(id);
    await this.bookModel.deleteOne({ _id: book._id });
  }

  private getSlugByTitle(title: string) {
    return slugify(title, {
      lower: true,
      trim: true,
    });
  }
}
