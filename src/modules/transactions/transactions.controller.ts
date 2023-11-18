import { Body, Controller, Get, HttpException, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransactionService } from './transactions.service';
import { GetTransactionDto } from './dto/get.transaction.dto';
import { CreateTransactionDto } from './dto/create.transaction.dto';

@ApiTags('Transaction')
@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get('/')
  async findAll(@Query() getTransactionDto: GetTransactionDto): Promise<any> {
    const { error, data, message, status} = await this.transactionService.findAll(getTransactionDto);
    if (error === true) {
        throw new HttpException({
            message
        }, status)
    }
    return { error, data };
  }

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    const { error, data, message, status} = await this.transactionService.create(createTransactionDto);
    if (error === true) {
        throw new HttpException({
            message
        }, status)
    }
    return { error, data };
  }
}
