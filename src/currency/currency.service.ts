import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class CurrencyService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('CURRENCY_API_KEY')??"";
    this.baseUrl = this.configService.get<string>('CURRENCY_API_BASE_URL')??"";
  }

  private async makeRequest(endpoint: string, params: any = {}) {
    try {
      const response = await axios.get(`${this.baseUrl}/${endpoint}`, {
        params: {
          apikey: this.apiKey,
          ...params,
        },
      });
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Failed to fetch data from currency API',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getStatus() {
    return this.makeRequest('status');
  }

  async getCurrencies() {
    return this.makeRequest('currencies');
  }

  async getLatestRates(baseCurrency?: string, currencies?: string) {
    const params: any = {};
    if (baseCurrency) params.base_currency = baseCurrency;
    if (currencies) params.currencies = currencies;
    return this.makeRequest('latest', params);
  }

  async getHistoricalRates(date?: string, baseCurrency?: string, currencies?: string) {
    if (!date) {
      throw new HttpException('Date parameter is required', HttpStatus.BAD_REQUEST);
    }
    const params: any = { date };
    if (baseCurrency) params.base_currency = baseCurrency;
    if (currencies) params.currencies = currencies;
    return this.makeRequest('historical', params);
  }
}
