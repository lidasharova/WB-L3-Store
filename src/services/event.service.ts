import { sendEventApi } from '../sendEventApi';
import { ProductData } from 'types';

class EventService {
  public sendEvent(type: string, payload: {}) {
    const event = {
      type,
      payload,
      timestamp: Date.now()
    };
    sendEventApi(event);
  }

  public sendRouteEvent(url: string) {
    this.sendEvent('route', { url });
    console.warn('событие перехода по страницам отправлено');
  }

  public sendAddToCartEvent(product: ProductData) {
    this.sendEvent('addToCard', { product });
    console.warn('событие добавления в корзину отправлено');
  }

  public async sendViewCardEvent(product: ProductData) {
    const isPromo = product.log !== undefined;
    this.sendEvent(isPromo ? 'viewCardPromo' : 'viewCard', { product });
    console.warn('событие попадания карточки во вьюпорт отправлено');
  }

  public sendOrderEvent(orderId: string, totalPrice: number, productIds: number[]) {
    this.sendEvent('purchase', { orderId, totalPrice, productIds });
    console.warn('событие оформления заказа отправлено');
  }
}

export const eventService = new EventService();
