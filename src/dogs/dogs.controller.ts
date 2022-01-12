import { Controller, Get, UseFilters } from '@nestjs/common';
import { ForbiddenException } from 'src/forbidden.exception';
import { HttpExceptionFilter } from 'src/http-exception.filter';

@Controller('dogs')
export class DogsController {
  @Get()
  @UseFilters(HttpExceptionFilter)
  async findAll() {
    throw new ForbiddenException();
  }
}
