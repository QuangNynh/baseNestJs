import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  getAllProduct() {
    return this.productRepository.find();
  }

  async getProductById(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  createProduct(data: Partial<Product>) {
    const product = this.productRepository.create(data);
    product.create_at = new Date();
    product.update_at = new Date();
    return this.productRepository.save(product);
  }
  async updateProduct(id: number, data: Partial<Product>) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    Object.assign(product, data);
    product.update_at = new Date();
    return this.productRepository.save(product);
  }

  async deleteProductById(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return this.productRepository.delete(id);
  }
}
