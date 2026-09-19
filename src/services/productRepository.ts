import { productsSeed } from '@/data/products.seed';
import { imageForProduct } from '@/data/productImages';
import type { Product } from '@/domain/types';

export interface ProductRepository {
  getAll(): Promise<Product[]>;
  /** Sync read for static V1 — avoids empty first paint on hero carousel. */
  getAllSync(): Product[];
  getBySlug(slug: string): Promise<Product | null>;
  getById(id: string): Promise<Product | null>;
  getByCollection(collectionId: string): Promise<Product[]>;
  search(query: string): Promise<Product[]>;
}

function withImages(products: Product[]): Product[] {
  return products.map((p) => ({
    ...p,
    image: p.image ?? imageForProduct(p.slug, p.collections, p.name),
  }));
}

function activeOnly(products: Product[]): Product[] {
  return products.filter((p) => p.isActive);
}

/**
 * Static in-memory repository. Swap for an API-backed implementation later.
 * This is the only module that may import products.seed.ts.
 */
export class StaticProductRepository implements ProductRepository {
  private readonly products: Product[];

  constructor(seed: Product[] = productsSeed) {
    this.products = withImages(seed);
  }

  async getAll(): Promise<Product[]> {
    return this.getAllSync();
  }

  getAllSync(): Product[] {
    return activeOnly(this.products);
  }

  async getBySlug(slug: string): Promise<Product | null> {
    const product = this.products.find(
      (p) => p.isActive && p.slug === slug,
    );
    return product ?? null;
  }

  async getById(id: string): Promise<Product | null> {
    const product = this.products.find((p) => p.isActive && p.id === id);
    return product ?? null;
  }

  async getByCollection(collectionId: string): Promise<Product[]> {
    return activeOnly(this.products).filter((p) =>
      p.collections.includes(collectionId),
    );
  }

  async search(query: string): Promise<Product[]> {
    const q = query.trim().toLowerCase();
    if (!q) return this.getAll();
    return activeOnly(this.products).filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.note?.toLowerCase().includes(q) ?? false),
    );
  }
}

/** Shared singleton for the static seed catalogue. */
export const productRepository: ProductRepository =
  new StaticProductRepository();
