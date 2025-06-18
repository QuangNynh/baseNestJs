import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Product } from 'src/entities/product.entity';
import { CreateProductDto } from './dto/createProduct.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  getAllProduct() {
    return this.productsService.getAllProduct();
  }

  @Get('/:id')
  getProductById(@Param('id') id: number) {
    return this.productsService.getProductById(id);
  }

  @Post()
  createProduct(@Body() data: CreateProductDto) {
    return this.productsService.createProduct(data);
  }

  @Put('/:id')
  updateProduct(@Param('id') id: number, @Body() data: Partial<Product>) {
    return this.productsService.updateProduct(id, data);
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: number) {
    return this.productsService.deleteProductById(id);
  }
}
