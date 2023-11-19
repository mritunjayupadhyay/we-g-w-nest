import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CardsModule } from './modules/cards/cards.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { OnlinePayModule } from './modules/pay/online-pay.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.MONGO_URL
    ),
    CardsModule,
    TransactionsModule,
    OnlinePayModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
