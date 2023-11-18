import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class GetTransactionDto {  
    @ApiProperty({
      type: String,
      default: '5425233430109903'
    })
    @IsString()
    @IsNotEmpty()
    public cardNumber: string;
}