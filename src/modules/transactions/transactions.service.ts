import { HttpStatus, Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransactionDto } from './dto/create.transaction.dto';
import { ITransaction } from './transaction.schema';
import { GetTransactionDto } from './dto/get.transaction.dto';

@Injectable({ scope: Scope.REQUEST })
export class TransactionService {
    constructor(
        @InjectModel('Transaction') private transactionModel: Model<ITransaction>,
    ) { }

    async findAll(getTransactionDto: GetTransactionDto)
        : Promise<{ error: boolean, message?: string, status?: number, data?: ITransaction[] }> {
        try {
            const { cardNumber } = getTransactionDto;
            const data = await this.transactionModel.find({ cardNumber });
            return { error: false, data };
        } catch (error) {
            return { error: true, message: error.message, status: HttpStatus.BAD_REQUEST };
        }
    }

    async create(createCardDto: CreateTransactionDto)
        : Promise<{ error: boolean, message?: string, status?: number, data?: ITransaction }> {

        try {
            const transaction = new this.transactionModel({
                ...createCardDto
            });
            const result = await transaction.save();
            return { error: false, data: transaction };
        } catch (error) {
            return { error: true, message: error.message, status: HttpStatus.BAD_REQUEST };
        }
    }
}
