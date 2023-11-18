import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
export class GetCardDto {
  @ApiProperty({
    type: String,
    default: '1'
  })
  @IsString()
  @IsNotEmpty()
  public userId: string;
}