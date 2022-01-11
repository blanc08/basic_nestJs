import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Redirect,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './create-cat.dto';

@Controller('cats')
export class CatsController {
  // * Get request
  @Get()
  findAll(@Req() request: Request): string {
    return ' This action returns all cats';
  }

  // * Wildcards
  //   @Get('ab*cd')
  //   findAll() {
  //     return 'This route uses a wildcard';
  //   }

  // * Query parameters
  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  // * Route parameters
  @Get(':id')
  findOne(@Param() params): string {
    console.log(params);
    return `This action returns a #${params.id} cat`;
  }

  // * or Define the particular parameter in the method body
  //   @Get(':id')
  //   findOne(@Param('id') id: string): string {
  //     return `This action returns a #${id} cat`;
  //   }

  // * Asynchronicity
  // ? use promise
  //   @Get()
  //   async findAll(): Promise<any[]> {
  //     return [];
  //   }

  // ? or use RxJS observable streams instead that more powerfull
  //   @Get()
  //   findAll(): Observable<any[]> {
  //     return of([]);
  //   }

  // * POST request
  // @Post()
  // // Status code
  // @HttpCode(204)
  // // Header
  // @Header('Cache-Control', 'none')
  // create(): string {
  //   return 'This action adds a new cat';
  // }

  // * Using Data Transfer Object(DTO)
  @Post()
  async create(@Body() CreateCatDto: CreateCatDto) {
    console.log(CreateCatDto);
    return 'This action adds a new cat';
  }
}
