import { sendEvent } from '../sendEventApi';
import { ProductData } from 'types';

class EventService {
  sendEvent(type: string, payload: {}) {
    const event = {
      type,
      payload,
      timestamp: Date.now()
    };
    sendEvent(event);
  }

  sendRouteEvent(url: string) {
    this.sendEvent('route', { url });
    console.warn('событие перехода по страницам отправлено');
  }

  sendAddToCartEvent(product: ProductData) {
    this.sendEvent('addToCard', { product });
    console.warn('событие добавления в корзину отправлено');
  }

  async sendViewCardEvent(product: ProductData) {
    const isPromo = product.log !== undefined;
    this.sendEvent(isPromo ? 'viewCardPromo' : 'viewCard', { product });
    console.warn('событие попадания карточки во вьюпорт отправлено');
  }

  sendOrderEvent(orderId: string, totalPrice: number, productIds: number[]) {
    this.sendEvent('purchase', { orderId, totalPrice, productIds });
    console.warn('событие оформления заказа отправлено');
  }
}

export const eventService = new EventService();
