import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class CreateCardDto {
  @ApiProperty({
    type: String,
    default: 'cust_test_5xtljdeg7t0bx0br9fi'
  })
  @IsString()
  @IsNotEmpty()
  public cust_id: string;

  @ApiProperty({
    type: String,
    default: 'card_test_5xtlgjd96saxp9cueld'
  })
  @IsString()
  @IsNotEmpty()
  public card_id: string;

  @ApiProperty({
    type: String,
    default: '4242'
  })
  @IsString()
  @IsNotEmpty()
  public last_digits: string;

  @ApiProperty({
    type: String,
    default: 'Mritunjay Upadhyay'
  })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({
    type: Number,
    default: 25
  })
  @IsNumber()
  @IsNotEmpty()
  public expiration_year: number;

  @ApiProperty({
    type: Number,
    default: 2
  })
  @IsNumber()
  @IsNotEmpty()
  public expiration_month: number;

  @ApiProperty({
    type: String,
    default: '4242'
  })
  @IsString()
  @IsNotEmpty()
  public brand: string;

  @ApiProperty({
    type: String,
    default: '4242'
  })
  @IsString()
  @IsNotEmpty()
  public bank: string;
}
