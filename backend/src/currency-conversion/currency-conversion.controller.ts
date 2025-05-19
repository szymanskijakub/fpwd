import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { CurrencyConversionService } from './currency-conversion.service';
import { ConvertCurrencyDto } from './dto/convert-currency.dto';

@Controller('currency-conversion')
export class CurrencyConversionController {
  constructor(private currencyConversionService: CurrencyConversionService) {}

  @Get()
  async convertCurrency(@Query() query: ConvertCurrencyDto) {
    try {
      const convertedAmount =
        await this.currencyConversionService.convertFromEuroToPln(query.amount);

      return {
        convertedAmount,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
