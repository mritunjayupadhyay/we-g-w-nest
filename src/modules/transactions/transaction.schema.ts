import * as mongoose from 'mongoose';

export const transactionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    cardNumber: {
        type: String,
        required: true,
    },
    reference: {
        type: String,
        required: true,
    },
    data: {
        type: Object,
        required: true,
    }
});

export interface ITransaction extends mongoose.Document {
    userId: string;
    cardNumber: string;
    reference: string;
    data: object;
}
