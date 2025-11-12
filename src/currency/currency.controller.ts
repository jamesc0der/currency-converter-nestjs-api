import { Controller, Get, Query } from '@nestjs/common';
import { CurrencyService } from './currency.service';

@Controller('api/currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('status')
  async getStatus() {
    return this.currencyService.getStatus();
  }

  @Get('currencies')
  async getCurrencies() {
    return this.currencyService.getCurrencies();
  }

  @Get('latest')
  async getLatestRates(
    @Query('base_currency') baseCurrency?: string,
    @Query('currencies') currencies?: string,
  ) {
    return this.currencyService.getLatestRates(baseCurrency, currencies);
  }

  @Get('historical')
  async getHistoricalRates(
    @Query('date') date?: string,
    @Query('base_currency') baseCurrency?: string,
    @Query('currencies') currencies?: string,
  ) {
    return this.currencyService.getHistoricalRates(date, baseCurrency, currencies);
  }
}
