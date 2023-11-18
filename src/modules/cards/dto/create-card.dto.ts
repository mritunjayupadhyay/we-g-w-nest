import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class CreateCardDto {
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
    default: 'Mritunjay Upadhyay'
  })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({
    type: Number,
    default: 3
  })
  @IsNumber()
  @IsNotEmpty()
  public expiryMonth: number;

  @ApiProperty({
    type: Number,
    default: 25
  })
  @IsNumber()
  @IsNotEmpty()
  public expiryYear: number;

  @ApiProperty({
    type: Number,
    default: 888
  })
  @IsNumber()
  @IsNotEmpty()
  public cvv: number;
}
