import { Module } from '@nestjs/common';
import { OnlinePayController } from './online-pay.controller';
import { OmiseService } from './omise.service';

@Module({
  imports: [],
  controllers: [OnlinePayController],
  providers: [OmiseService],
})
export class OnlinePayModule {}
