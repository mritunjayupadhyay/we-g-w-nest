import { HttpStatus, Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCardDto } from './dto/create-card.dto';
import { ICard } from './card.schema';
import { GetCardDto } from './dto/get-card.dto';
import { validate } from 'class-validator';
@Injectable({ scope: Scope.REQUEST })
export class CardsService {
  constructor(
    @InjectModel('Card') private cardModel: Model<ICard>,
  ) {}

  async findAll(getQuestionDto: GetCardDto)
  :Promise<{error: boolean, message?: string, status?: number, data?: ICard[]}> {
    try {
      const { userId } = getQuestionDto;
      const data = await this.cardModel.find({ userId });
      return {error: false, data};
    } catch (error) {
      return {error: true, message: error.message, status: HttpStatus.BAD_REQUEST};
    }
  }

  findOne(cardNumber: string) {
    return this.cardModel.findById({cardNumber});
  }

  async validateCard(createCardDto: CreateCardDto): 
  Promise<{error: boolean, status?: number, message?: string, card?:ICard}> {
    const { cardNumber, userId, name, cvv, expiryMonth, expiryYear } = createCardDto;
    const card = await this.cardModel.findOne({cardNumber});
    if (card) {
      return {error: true, card, message: 'Card already exists'};
    }
    const newCard: ICard = new this.cardModel({})
    newCard.cardNumber = cardNumber;
    newCard.name = name;
    newCard.cvv = cvv;
    newCard.expiryMonth = expiryMonth;
    newCard.expiryYear = expiryYear;
    newCard.userId = userId; 
    const errors = await validate(newCard);
        if (errors.length > 0) {
            return { 
                error: true, 
                message: errors.join(""),
                status: HttpStatus.BAD_REQUEST
            };
        } else {
            return {error: false, card: newCard};
        }
  }

  async create(createCardDto: CreateCardDto)
  : Promise<{error: boolean, message?: string, status?: number, data?: ICard}> {
    const validatedCard = await this.validateCard(createCardDto);
        if (validatedCard.error === true) {
            return validatedCard;
        } else {
          const newCard = new this.cardModel({
            ...createCardDto
          });
          const result = await newCard.save();
            return {error: false, data: newCard};
        }
  }
}
