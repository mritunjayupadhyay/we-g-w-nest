import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AddCardToCustomerDto {  
    @ApiProperty({
      type: String,
      default: 'cust_test_5xtljdeg7t0bx0br9fi'
    })
    @IsString()
    @IsNotEmpty()
    public customer: string;

    @ApiProperty({
        type: String,
        default: 'token_test_5xtlgjd96saxp9cueld'
      })
      @IsString()
      @IsNotEmpty()
      public token: string;
}