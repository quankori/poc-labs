import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { ProductElasticsearchService } from '../elasticsearch/elasticsearch.service';
import { ProductService } from './products.service';
import { Product } from './entities/product.entity';

// Define a type for the mocked Repository
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

// Factory function to create a mock Repository
const createMockRepository = <T = any>(): MockRepository<T> => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  preload: jest.fn(),
  delete: jest.fn(),
  createQueryBuilder: jest.fn(),
});

// Define a type for the mocked ProductElasticsearchService
type MockElasticsearchService = Partial<
  Record<keyof ProductElasticsearchService, jest.Mock>
>;

// Factory function to create a mock ProductElasticsearchService
const createMockElasticsearchService = (): MockElasticsearchService => ({
  indexProduct: jest.fn(),
  updateProduct: jest.fn(),
  deleteProduct: jest.fn(),
  searchBySkuOrSpu: jest.fn(),
});

describe('ProductService', () => {
  let service: ProductService;
  let repository: MockRepository<Product>;
  let elasticsearchService: MockElasticsearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: createMockRepository(),
        },
        {
          provide: ProductElasticsearchService,
          useValue: createMockElasticsearchService(),
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get<MockRepository<Product>>(
      getRepositoryToken(Product),
    );
    elasticsearchService = module.get<MockElasticsearchService>(
      ProductElasticsearchService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a product', async () => {
      const createProductDto = {
        sku: 'SKU12345',
        spu: 'SPU67890',
        name: 'Sample Product',
        price: 99.99,
      };

      // Mock repository.findOne to return null (no existing product)
      repository.findOne.mockResolvedValue(null);

      // Mock repository.create to return the DTO
      repository.create.mockReturnValue(createProductDto);

      // Mock repository.save to resolve the created product
      repository.save.mockResolvedValue(createProductDto);

      // Mock Elasticsearch indexing
      elasticsearchService.indexProduct.mockResolvedValue(undefined);

      const result = await service.create(createProductDto);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { sku: createProductDto.sku },
      });
      expect(repository.create).toHaveBeenCalledWith(createProductDto);
      expect(repository.save).toHaveBeenCalledWith(createProductDto);
      expect(elasticsearchService.indexProduct).toHaveBeenCalledWith(
        createProductDto,
      );
      expect(result).toEqual(createProductDto);
    });

    it('should throw BadRequestException if SKU already exists', async () => {
      const createProductDto = {
        sku: 'SKU12345',
        spu: 'SPU67890',
        name: 'Sample Product',
        price: 99.99,
      };

      // Mock repository.findOne to return an existing product
      repository.findOne.mockResolvedValue(createProductDto);

      await expect(service.create(createProductDto)).rejects.toThrow(
        new BadRequestException(
          `Product with SKU ${createProductDto.sku} already exists`,
        ),
      );

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { sku: createProductDto.sku },
      });
      expect(repository.create).not.toHaveBeenCalled();
      expect(repository.save).not.toHaveBeenCalled();
      expect(elasticsearchService.indexProduct).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products = [
        {
          sku: 'SKU12345',
          spu: 'SPU67890',
          name: 'Sample Product',
          price: 99.99,
        },
      ];

      repository.find.mockResolvedValue(products);

      const result = await service.findAll();
      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(products);
    });
  });

  describe('findOne', () => {
    it('should return a single product', async () => {
      const product = {
        sku: 'SKU12345',
        spu: 'SPU67890',
        name: 'Sample Product',
        price: 99.99,
      };

      repository.findOne.mockResolvedValue(product);

      const result = await service.findOne('SKU12345');
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { sku: 'SKU12345' },
      });
      expect(result).toEqual(product);
    });

    it('should throw NotFoundException if product not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findOne('SKU12345')).rejects.toThrow(
        new NotFoundException(`Product with SKU SKU12345 not found`),
      );
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { sku: 'SKU12345' },
      });
    });
  });

  describe('update', () => {
    it('should update and return the updated product', async () => {
      const updateProductDto = {
        price: 89.99,
      };

      const updatedProduct = {
        sku: 'SKU12345',
        spu: 'SPU67890',
        name: 'Sample Product',
        price: 89.99,
      };

      repository.preload.mockResolvedValue(updatedProduct);
      repository.save.mockResolvedValue(updatedProduct);
      elasticsearchService.updateProduct.mockResolvedValue(undefined);

      const result = await service.update('SKU12345', updateProductDto);

      expect(repository.preload).toHaveBeenCalledWith({
        sku: 'SKU12345',
        ...updateProductDto,
      });
      expect(repository.save).toHaveBeenCalledWith(updatedProduct);
      expect(elasticsearchService.updateProduct).toHaveBeenCalledWith(
        updatedProduct,
      );
      expect(result).toEqual(updatedProduct);
    });

    it('should throw NotFoundException if product to update does not exist', async () => {
      const updateProductDto = {
        price: 89.99,
      };

      repository.preload.mockResolvedValue(null);

      await expect(
        service.update('SKU12345', updateProductDto),
      ).rejects.toThrow(
        new NotFoundException(`Product with SKU SKU12345 not found`),
      );
      expect(repository.preload).toHaveBeenCalledWith({
        sku: 'SKU12345',
        ...updateProductDto,
      });
      expect(repository.save).not.toHaveBeenCalled();
      expect(elasticsearchService.updateProduct).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should delete the product and return true', async () => {
      repository.delete.mockResolvedValue({ affected: 1 });
      elasticsearchService.deleteProduct.mockResolvedValue(undefined);

      const result = await service.remove('SKU12345');

      expect(repository.delete).toHaveBeenCalledWith('SKU12345');
      expect(elasticsearchService.deleteProduct).toHaveBeenCalledWith(
        'SKU12345',
      );
      expect(result).toBe(true);
    });

    it('should throw NotFoundException if product to delete does not exist', async () => {
      repository.delete.mockResolvedValue({ affected: 0 });

      await expect(service.remove('SKU12345')).rejects.toThrow(
        new NotFoundException(`Product with SKU SKU12345 not found`),
      );
      expect(repository.delete).toHaveBeenCalledWith('SKU12345');
      expect(elasticsearchService.deleteProduct).not.toHaveBeenCalled();
    });
  });

  describe('search', () => {
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

      elasticsearchService.searchBySkuOrSpu.mockResolvedValue(products);

      const result = await service.search(query);
      expect(elasticsearchService.searchBySkuOrSpu).toHaveBeenCalledWith(query);
      expect(result).toEqual(products);
    });
  });
});
