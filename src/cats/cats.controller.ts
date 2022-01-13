import { Controller, Get } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
