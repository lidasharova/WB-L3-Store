import localforage from 'localforage';
import { ProductData } from 'types';

const DB = '__wb-favourite';

class FavouriteService {
  init() {
    this._updCounters();
  }

  async addProduct(favouriteProduct: ProductData) {
    const favouriteProducts = await this.get();
    await this.set([...favouriteProducts, favouriteProduct]);
  }

  async removeProduct(favouriteProduct: ProductData) {
    const favouriteProducts = await this.get();
    await this.set(favouriteProducts.filter(({ id }) => id !== favouriteProduct.id));
    this._updCounters();
  }

  async clear() {
    await localforage.removeItem(DB);
    this._updCounters();
  }

  async get(): Promise<ProductData[]> {
    return (await localforage.getItem(DB)) || [];
  }

  async set(data: ProductData[]) {
    await localforage.setItem(DB, data);
    this._updCounters();
  }

  async isInFavourite(favouriteProduct: ProductData) {
    const favouriteProducts = await this.get();
    return favouriteProducts.some(({ id }) => id === favouriteProduct.id);
  }

  private async _updCounters() {
    const favouriteProducts = await this.get();
    const count = favouriteProducts.length >= 10 ? '9+' : favouriteProducts.length;
    document.querySelectorAll('.js__favourite-counter').forEach(($el) => {
      ($el as HTMLElement).innerText = String(count || '');
    });

    if (favouriteProducts.length > 0) {
      document.querySelectorAll('.js__favourite-link').forEach(($el) => {
        ($el as HTMLElement).classList.remove('hide');
      });
    } else {
      document.querySelectorAll('.js__favourite-link').forEach(($el) => {
        ($el as HTMLElement).classList.add('hide');
      });
    }
  }
}

export const favouriteService = new FavouriteService();
