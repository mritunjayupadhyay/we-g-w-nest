import { Body, Controller, Delete, Get, HttpException, Param, Post, Query } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { CardsService } from './cards.service';
import { ApiTags } from '@nestjs/swagger';
import { GetCardDto } from './dto/get-card.dto';

@ApiTags('Card')
@Controller('cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Get('/')
  async findAll(@Query() getQuestionDto: GetCardDto): Promise<any> {
    const { error, data, message, status} = await this.cardsService.findAll(getQuestionDto);
    if (error === true) {
        throw new HttpException({
            message
        }, status)
    }
    return { error, data };
  }

  @Post()
  async create(@Body() createCardDto: CreateCardDto) {
    const { error, data, message, status} = await this.cardsService.create(createCardDto);
    if (error === true) {
        throw new HttpException({
            message
        }, status)
    }
    return { error, data };
  }
}
