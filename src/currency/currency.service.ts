import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CurrencyService {
  // private readonly apiKey = '4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2';
  private readonly apiKey = 'fca_live_asDod6B5jHbZ5HKOEr8NiWhEfksZwtwRbwDBmRLt';
  private readonly baseUrl = 'https://api.freecurrencyapi.com/v1';

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
