import * as mongoose from 'mongoose';

export const cardSchema = new mongoose.Schema({
  cust_id: {
    type: String,
    required: true,
  },
  card_id: {
    type: String,
    required: true,
  },
  last_digits: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  expiration_year: {
    type: Number,
    required: true,
  },
  expiration_month: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  bank: {
    type: String,
    required: true,
  }
});

export interface ICard extends mongoose.Document {
  cust_id: string,
  card_id: string,
  expiration_year: number,
  expiration_month: number,
  name: string,
  last_digits: string,
  brand: string,
  bank: string
}
