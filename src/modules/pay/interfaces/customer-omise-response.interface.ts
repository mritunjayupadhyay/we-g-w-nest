export interface IOmiseCardResponse {
    object: "card",
    id: string,
    expiration_year: number,
    expiration_month: number,
    name: string,
    last_digits: string,
    brand: string,
    bank: string
}
export interface IOmiseCustomerResponse {
    object: "customer",
    id: string,
    cards: {
        data: IOmiseCardResponse[]
    },
    email: string,
    description: string,
    default_card: string
}

export interface IAllCardsResponse {
    object: "list",
    data: IOmiseCardResponse[]
}