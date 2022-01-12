import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';
import { JoiValidationPipe } from './validations/joiValidation.pipe';
import { ValidationPipe } from './validations/validation.pipe';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  // Pipe
  // use parameter binding to leave responsibility for instatiation to the framework and enbaling dependency injection
  // use in-place Instance to customize the behavior of the pipe(ex : options)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.findOne(id);
  }

  @Post()
  // @UsePipes(new JoiValidationPipe(createCatSchema))
  async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    console.log(CreateCatDto);
    this.catsService.create(createCatDto);
  }
}
