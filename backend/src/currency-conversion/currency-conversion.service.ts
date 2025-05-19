import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { CachedRate } from './currency-conversion.types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CurrencyConversionService {
  private cachedRate: CachedRate;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async convertFromEuroToPln(amount: number) {
    const exchangeRate = await this.getCurrentExchangeRate();

    const exchangeAmount = Number((amount * exchangeRate).toFixed(4));

    return { exchangeAmount };
  }

  async getCurrentExchangeRate() {
    let exchangeRate: number = this.cachedRate?.exchangeRate;

    if (
      this.cachedRate?.expiresAt < Date.now() ||
      !this.cachedRate?.expiresAt
    ) {
      exchangeRate = await this.fetchExchangeRate();
    }

    return exchangeRate;
  }

  async fetchExchangeRate(): Promise<number> {
    const response = await firstValueFrom(
      this.httpService.get(
        `https://ldktuanhf9.execute-api.eu-central-1.amazonaws.com/api`,
        {
          headers: {
            'x-api-key': this.configService.get<string>('CURRENCY_API_KEY'),
          },
        },
      ),
    );

    const resData = response.data as { exchange_rate: number };

    this.cachedRate = {
      exchangeRate: resData.exchange_rate,
      expiresAt: Date.now() + 60 * 1000,
    };
    return resData.exchange_rate;
  }
}
