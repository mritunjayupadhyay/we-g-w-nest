import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class GetCardsDto {  
    @ApiProperty({
      type: String,
      default: 'cust_test_53reuowpjglur236wm7'
    })
    @IsString()
    @IsNotEmpty()
    public cust_id: string;
}