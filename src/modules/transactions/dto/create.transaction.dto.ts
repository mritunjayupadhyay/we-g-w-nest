import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
export class CreateTransactionDto {
  @ApiProperty({
    type: String,
    default: '1'
  })
  @IsString()
  @IsNotEmpty()
  public userId: string;

  @ApiProperty({
    type: String,
    default: '5425233430109903'
  })
  @IsString()
  @IsNotEmpty()
  public cardNumber: string;

  @ApiProperty({
    type: String,
    default: 'paying for test'
  })
  @IsString()
  @IsNotEmpty()
  public reference: string;

    @ApiProperty({
        type: Object,
        default: "{price: 1000}"
    })
    public data: object;
}