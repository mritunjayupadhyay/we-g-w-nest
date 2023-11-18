import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionController } from './transactions.controller';
import { TransactionService } from './transactions.service';
import { transactionSchema } from './transaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Transaction', schema: transactionSchema }]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionsModule {}
