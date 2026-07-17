import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FirebaseAuthGuard } from '../auth/firebase-auth/firebase-auth.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
  ) {}

  @UseGuards(FirebaseAuthGuard)
  @Post()
  createCategory(
    @Req() req: any,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoriesService.createCategory(
      req.user.uid,
      createCategoryDto,
    );
  }

  @UseGuards(FirebaseAuthGuard)
  @Get()
  getAllCategories(@Req() req: any) {
    return this.categoriesService.getAllCategories(
      req.user.uid,
    );
  }

  @UseGuards(FirebaseAuthGuard)
  @Patch(':id')
  updateCategory(
    @Req() req: any,
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(
      req.user.uid,
      id,
      updateCategoryDto,
    );
  }

  @UseGuards(FirebaseAuthGuard)
  @Delete(':id')
  deleteCategory(
    @Req() req: any,
    @Param('id') id: string,
  ) {
    return this.categoriesService.deleteCategory(
      req.user.uid,
      id,
    );
  }
}