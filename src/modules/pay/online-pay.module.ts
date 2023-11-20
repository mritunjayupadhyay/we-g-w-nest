import { Module } from '@nestjs/common';
import { OnlinePayController } from './online-pay.controller';
import { OmiseService } from './omise.service';
import { CardsModule } from '../cards/cards.module';
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
  imports: [CardsModule, TransactionsModule],
  controllers: [OnlinePayController],
  providers: [OmiseService],
})
export class OnlinePayModule {}
