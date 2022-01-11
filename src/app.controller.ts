import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Route parameters
  @Get('about/:id')
  return(@Param() params) {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }
}
