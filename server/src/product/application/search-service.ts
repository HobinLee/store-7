import { ETException } from "@/config/filter/exception-handler";
import messages from "@/config/messages";
import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { Products } from "../domain/products";
import { ProductElementResponse } from "../dto/product-element-response";
import { ProductSearchQuery } from "../dto/product-find-query";
import { SearchProduct } from "../dto/product-search-response";
import { Product } from "../entity/product";

const MAX_SIZE = 500;

@Injectable()
export class SearchService {
  index = "products";
  type = "search";
  constructor(
    private readonly searchService: ElasticsearchService,
    private readonly products: Products
  ) {}

  async createProduct(product: SearchProduct) {
    try {
      await this.searchService.create({
        index: this.index,
        id: product.productId.toString(),
        type: this.type,
        body: product,
      });
    } catch (e) {
      console.error(e);
      throw new ETException(400, messages.failed.FAILED_TO_INSERT_ES);
    }
  }

  async deleteProduct(id: number) {
    try {
      await this.searchService.deleteByQuery({
        index: this.index,
        type: this.type,
        body: {
          query: {
            match: {
              productId: id,
            },
          },
        },
      });
    } catch (e) {
      console.error(e);
      throw new ETException(404, messages.failed.FAILED_TO_INSERT_ES);
    }
  }

  async findKeywords(keyword: string): Promise<string[]> {
    return await this.searchProductNames(keyword);
  }

  async search(name: string) {
    const result = await this.searchService.search({
      index: this.index,
      type: this.type,
      body: {
        query: {
          match: { name },
        },
      },
      size: MAX_SIZE,
    });

    return result.body?.hits?.hits ?? [];
  }

  async searchProductIds(keyword: string): Promise<number[]> {
    return (await this.search(keyword)).map(
      (product) => product._source.productId
    );
  }

  async searchProductNames(keyword: string): Promise<string[]> {
    return (await this.search(keyword)).map((product) => product._source.name);
  }

  async searchProducts(
    searchQuery: ProductSearchQuery,
    userId: number
  ): Promise<ProductElementResponse[]> {
    const productIds: number[] = await this.searchProductIds(
      searchQuery.keyword
    );

    if (!productIds.length) return [];

    const products: Product[] = await this.products.findProductsByQueries(
      {
        ...searchQuery,
        ids: productIds,
      },
      userId
    );

    return products.map(ProductElementResponse.of) ?? [];
  }

  async setAllProductsIntoElasticSearch() {
    try {
      const products: Product[] = await this.products.findAllProducts();
      products.forEach((product: Product) =>
        this.createProduct(SearchProduct.of(product))
      );
    } catch {
      throw Error("실패");
    }
  }
}
