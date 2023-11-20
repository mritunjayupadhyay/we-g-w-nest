import { HttpStatus, Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCustomerDto } from './dto/createCustomer.dto';
import { GetCardsDto } from './dto/getCards.dto';
import { ChargeWithCustomerCardDto } from './dto/chargeWithCustomerCard.dto';
import { AddCardToCustomerDto } from './dto/addCardToCustomer.dto';
import { IAllCardsResponse, IOmiseCustomerResponse } from './interfaces/customer-omise-response.interface';
import { ICard } from '../cards/card.schema';
import { formatCards } from './format.helper';
import { CardsService } from '../cards/cards.service';
import { TransactionService } from '../transactions/transactions.service';
import { CreateTransactionDto } from '../transactions/dto/create.transaction.dto';

var omise = require('omise')({
    'secretKey': 'skey_test_5wvisdjjoqmfof5npzw',
    'omiseVersion': '2019-05-29'
  });


@Injectable({ scope: Scope.REQUEST })
export class OmiseService {
    constructor(
        private cardsService: CardsService,
        private transactionService: TransactionService
    ) { }

    async findAll(getCardsDto: GetCardsDto)
        : Promise<{ error: boolean, message?: string, status?: number, data?: Partial<ICard>[] }> {
        try {
            const customers: IAllCardsResponse = await omise.customers.listCards(
                getCardsDto.cust_id
              )
            return { error: false, data: formatCards(customers.data, getCardsDto.cust_id) };
        } catch (error) {
            return { error: true, message: error.message, status: HttpStatus.BAD_REQUEST };
        }
    }

    async createCustomer(createCustomerDto: CreateCustomerDto)
        : Promise<{ error: boolean, message?: string, status?: number, data?: {cust_id: string, cards: Partial<ICard>[]} }> {
        const { email, description, token } = createCustomerDto;
        try {
            const customer:IOmiseCustomerResponse = await omise.customers.create({
                email,
                description,
                'card': token//tokenId
              })
              try {
                await this.cardsService.addCards(formatCards(customer.cards.data, customer.id))
              } catch (error) {
                console.log("error", error);
              }
            return { error: false, data: {cust_id: customer.id, cards: formatCards(customer.cards.data, customer.id)} };
        } catch (error) {
            return { error: true, message: error.message, status: HttpStatus.BAD_REQUEST };
        }
    }

    async chargeWithCustomerAndCard(chargeWithCustomerCardDto: ChargeWithCustomerCardDto)
        : Promise<{ error: boolean, message?: string, status?: number, data?: any }> {
        const { customer, card } = chargeWithCustomerCardDto;
        try {
            const charge = await omise.charges.create({
                amount: '2100',
                currency: 'thb',
                customer,
                card,
              })
              try {
                const createCardDto: CreateTransactionDto = {
                    userId: customer,
                    cardNumber: card,
                    reference: 'charged for test',
                    data: charge
                }
                await this.transactionService.create(createCardDto);
              } catch (error) {
                console.log("error", error);
              }
            return { error: false, data: charge };
        } catch (error) {
            return { error: true, message: error.message, status: HttpStatus.BAD_REQUEST };
        }
    }

    async addCardToCustomer(addCardToCustomerDto: AddCardToCustomerDto)
        : Promise<{ error: boolean, message?: string, status?: number, data?: {cust_id: string, cards: Partial<ICard>[]} }> {
        const { customer, token } = addCardToCustomerDto;
        try {
            const updatedCustomer: IOmiseCustomerResponse = await omise.customers.update(customer, {
                card: token
              })

              return { error: false, data: {cust_id: customer, cards: formatCards(updatedCustomer.cards.data, customer)} };
            } catch (error) {
            return { error: true, message: error.message, status: HttpStatus.BAD_REQUEST };
        }
    }
}
