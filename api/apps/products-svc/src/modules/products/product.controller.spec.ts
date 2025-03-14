import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';

describe('ProductController', () => {
  let controller: ProductController;
  let service: Partial<ProductService>;

  beforeEach(async () => {
    service = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
      search: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [{ provide: ProductService, useValue: service }],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createProduct', () => {
    it('should create and return a product', async () => {
      const product = {
        sku: 'SKU12345',
        spu: 'SPU67890',
        name: 'Sample Product',
        price: 99.99,
      };

      (service.create as jest.Mock).mockResolvedValue(product);

      const result = await controller.createProduct({ product });
      expect(service.create).toHaveBeenCalledWith(product);
      expect(result).toEqual({ product });
    });

    it('should throw BadRequestException on error', async () => {
      const product = {
        sku: 'SKU12345',
        spu: 'SPU67890',
        name: 'Sample Product',
        price: 99.99,
      };

      (service.create as jest.Mock).mockRejectedValue(
        new BadRequestException('Error'),
      );

      await expect(controller.createProduct({ product })).rejects.toThrow(
        BadRequestException,
      );
      expect(service.create).toHaveBeenCalledWith(product);
    });
  });

  describe('getProduct', () => {
    it('should return a single product', async () => {
      const product = {
        sku: 'SKU12345',
        spu: 'SPU67890',
        name: 'Sample Product',
        price: 99.99,
      };

      (service.findOne as jest.Mock).mockResolvedValue(product);

      const result = await controller.getProduct({ sku: 'SKU12345' });
      expect(service.findOne).toHaveBeenCalledWith('SKU12345');
      expect(result).toEqual({ product });
    });

    it('should throw NotFoundException on error', async () => {
      (service.findOne as jest.Mock).mockRejectedValue(
        new NotFoundException('Error'),
      );

      await expect(controller.getProduct({ sku: 'SKU12345' })).rejects.toThrow(
        NotFoundException,
      );
      expect(service.findOne).toHaveBeenCalledWith('SKU12345');
    });
  });

  describe('updateProduct', () => {
    it('should update and return the updated product', async () => {
      const updatedProduct = {
        sku: 'SKU12345',
        spu: 'SPU67890',
        name: 'Sample Product',
        price: 89.99,
      };

      (service.update as jest.Mock).mockResolvedValue(updatedProduct);

      const result = await controller.updateProduct({
        sku: 'SKU12345',
        product: { price: 89.99 },
      });
      expect(service.update).toHaveBeenCalledWith('SKU12345', { price: 89.99 });
      expect(result).toEqual({ product: updatedProduct });
    });

    it('should throw BadRequestException on error', async () => {
      (service.update as jest.Mock).mockRejectedValue(
        new BadRequestException('Error'),
      );

      await expect(
        controller.updateProduct({
          sku: 'SKU12345',
          product: { price: 89.99 },
        }),
      ).rejects.toThrow(BadRequestException);
      expect(service.update).toHaveBeenCalledWith('SKU12345', { price: 89.99 });
    });
  });

  describe('deleteProduct', () => {
    it('should delete the product and return success', async () => {
      (service.remove as jest.Mock).mockResolvedValue(true);

      const result = await controller.deleteProduct({ sku: 'SKU12345' });
      expect(service.remove).toHaveBeenCalledWith('SKU12345');
      expect(result).toEqual({ success: true });
    });

    it('should throw NotFoundException on error', async () => {
      (service.remove as jest.Mock).mockRejectedValue(
        new NotFoundException('Error'),
      );

      await expect(
        controller.deleteProduct({ sku: 'SKU12345' }),
      ).rejects.toThrow(NotFoundException);
      expect(service.remove).toHaveBeenCalledWith('SKU12345');
    });
  });

  describe('listProducts', () => {
    it('should return an array of products', async () => {
      const products = [
        {
          sku: 'SKU12345',
          spu: 'SPU67890',
          name: 'Sample Product',
          price: 99.99,
        },
      ];

      (service.findAll as jest.Mock).mockResolvedValue(products);

      const result = await controller.listProducts({});
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual({ products });
    });
  });

  describe('searchProducts', () => {
    it('should return an array of products matching the query', async () => {
      const query = 'SKU123';
      const products = [
        {
          sku: 'SKU12345',
          spu: 'SPU67890',
          name: 'Sample Product',
          price: 99.99,
        },
      ];

      (service.search as jest.Mock).mockResolvedValue(products);

      const result = await controller.searchProducts({ query });
      expect(service.search).toHaveBeenCalledWith(query);
      expect(result).toEqual({ products });
    });
  });
});
