import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { CreateProductDto } from "./dtos/create-product.dto";
import { EditProductDto } from "./dtos/edit-product.dto";
import { ProductsService } from "./products.service";

// localhost:3000/products
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  // localhost:3000/products
  @Get()
  getProducts() {
    return this.productsService.getAll();
  }

  // localhost:3000/products/1
  @Get('/:id')
  getProduct(@Param('id') id: string) {
    return this.productsService.getById(parseInt(id));
  }

  // localhost:3000/products POST
  @Post()
  addProduct(@Body() body: CreateProductDto) {
    return this.productsService.add(body.title, body.price);
  }

  // localhost:3000/products/1 DELETE
  @Delete('/:id')
  @HttpCode(204)
  removeProduct(@Param('id') id: string) {
    this.productsService.remove(+id);
  }

  // localhost:3000/products/1 PATCH
  @Patch('/:id')
  editProduct(@Body() body: EditProductDto, @Param('id') id: string) {
    return this.productsService.edit(+id, body.price)
  }
}