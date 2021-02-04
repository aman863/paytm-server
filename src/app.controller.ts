import { Body, Controller, Get, Post } from '@nestjs/common';
import AppService from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Post("initiate")
  async initiatePayment(
    @Body() body
  ) {
    const response = await this.appService.initiateTransaction(body);
    return response;
  }
}
