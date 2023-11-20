import { Body, Controller, Get, HttpException, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OmiseService } from './omise.service';
import { CreateCustomerDto } from './dto/createCustomer.dto';
import { GetCardsDto } from './dto/getCards.dto';
import { ChargeWithCustomerCardDto } from './dto/chargeWithCustomerCard.dto';
import { AddCardToCustomerDto } from './dto/addCardToCustomer.dto';

@ApiTags('OnlinePay')
@Controller('online-pay')
export class OnlinePayController {
  constructor(private omiseCustomersService: OmiseService) {}

  @Get('/cards')
  async findAllCards(@Query() getCardsDto: GetCardsDto) {
    const { error, data, message, status} = await this.omiseCustomersService.findAll(getCardsDto);
    if (error === true) {
        throw new HttpException({
            message
        }, status)
    }
    return { error, data };
  }

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    const { error, data, message, status} = await this.omiseCustomersService.createCustomer(createCustomerDto);

    if (error === true) {
        throw new HttpException({
            message
        }, status)
    }
    return { error, data };
  }

  @Post('/charge')
  async createcharge(@Body() chargeWithCustomerCardDto: ChargeWithCustomerCardDto) {
    const { error, data, message, status} = await this.omiseCustomersService.chargeWithCustomerAndCard(chargeWithCustomerCardDto);

    if (error === true) {
        throw new HttpException({
            message
        }, status)
    }
    return { error, data };
  }

  @Post('/add-card')
  async addCard(@Body() addCardToCustomerDto: AddCardToCustomerDto) {
    const { error, data, message, status} = await this.omiseCustomersService.addCardToCustomer(addCardToCustomerDto);

    if (error === true) {
        throw new HttpException({
            message
        }, status)
    }
    return { error, data };
  }
}
