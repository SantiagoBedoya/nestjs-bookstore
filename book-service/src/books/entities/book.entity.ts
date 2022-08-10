import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Document & Book;

@Schema({
  timestamps: true,
})
export class Book {
  @Prop({
    unique: true,
  })
  ISBN: string;
  @Prop()
  title: string;
  @Prop({
    unique: true,
  })
  slug: string;
  @Prop()
  subject: string;
  @Prop()
  publisher: string;
  @Prop()
  language: string;
  @Prop({
    type: Number,
  })
  numberOfPages: number;
  @Prop()
  stock: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
