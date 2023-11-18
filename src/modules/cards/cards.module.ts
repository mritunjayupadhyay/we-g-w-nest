import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardsController } from './cards.controller';
import { cardSchema } from './card.schema';
import { CardsService } from './cards.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Card', schema: cardSchema }]),
  ],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
