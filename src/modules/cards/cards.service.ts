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
      const { cust_id } = getQuestionDto;
      const data = await this.cardModel.find({ cust_id });
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
    const { last_digits, bank, brand, expiration_month, expiration_year,
    name, cust_id, card_id } = createCardDto;
    const card = await this.cardModel.findOne({card_id});
    if (card) {
      return {error: true, card, message: 'Card already exists'};
    }
    const newCard: ICard = new this.cardModel({})
    newCard.last_digits = last_digits;
    newCard.card_id = card_id;
    newCard.name = name;
    newCard.bank = bank;
    newCard.brand = brand;
    newCard.expiration_month = expiration_month;
    newCard.expiration_year = expiration_year;
    newCard.cust_id = cust_id; 
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

  async addCards(cards: Partial<ICard>[]) {
    for (const card of cards) {
      await this.create(card as CreateCardDto);
    }
  }
}
