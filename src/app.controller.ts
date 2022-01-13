import { Controller, Get, Param } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  // Route parameters
  @Get('about/:id')
  return(@Param() params) {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }
}
