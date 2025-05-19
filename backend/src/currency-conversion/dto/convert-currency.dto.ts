import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class ConvertCurrencyDto {
  @IsNotEmpty({ message: 'amount cannot be empty.' })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'amount must be a number.' },
  )
  @Type(() => Number)
  @ApiProperty({ type: 'number', required: true, example: 10 })
  amount: number;
}
