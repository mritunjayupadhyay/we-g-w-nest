import * as mongoose from 'mongoose';

export const cardSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  expiryMonth: {
    type: Number,
    required: true,
  },
  expiryYear: {
    type: Number,
    required: true,
  },
  cvv: {
    type: Number,
    required: true,
  }
});

export interface ICard extends mongoose.Document {
  userId: string;
  cardNumber: string;
  name: string;
  expiryMonth: number;
  expiryYear: number;
  cvv: number;
}
