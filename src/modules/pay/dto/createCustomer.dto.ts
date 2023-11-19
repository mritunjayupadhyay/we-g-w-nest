import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
export class CreateCustomerDto {
    @ApiProperty({
        type: String,
        default: 'Mritunjay'
    })
    @IsString()
    public description: string;

    @ApiProperty({
        type: String,
        default: 'mupadhyay00@gmail.com'
    })
    @IsString()
    public email: string;

    @ApiProperty({
        type: String,
        default: "{price: 1000}"
    })
    public token: string;
}