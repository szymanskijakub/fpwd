import { AppController } from './app.controller';
import { CurrencyConversionModule } from './currency-conversion/currency-conversion.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CurrencyConversionModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
