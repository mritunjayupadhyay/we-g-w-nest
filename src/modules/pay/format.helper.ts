import { ICard } from "../cards/card.schema";
import { IOmiseCardResponse } from "./interfaces/customer-omise-response.interface";

export const formatCards = (cards: IOmiseCardResponse[], cust_id: string): Partial<ICard>[] => {
    return cards.map(card => {
        const { id, expiration_year, expiration_month, name, last_digits, brand, bank } = card;
        return {
            cust_id,
            card_id: id,
            expiration_year,
            expiration_month,
            name,
            last_digits,
            brand,
            bank
        }
     });   
 }