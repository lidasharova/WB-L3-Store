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
    console.log('событие перехода по страницам отправлено');
  }

  sendAddToCartEvent(product: ProductData) {
    this.sendEvent('addToCard', { product });
    console.log(product);
    console.log('событие добавления в корзину отправлено');
  }

  async sendViewCardEvent(product: ProductData) {
    // получим secretKey карточки
    const response = await fetch(`/api/getProductSecretKey?id=${product.id}`);
    const secretKey = await response.json();

    const isPromo = product.log !== undefined;
    this.sendEvent(isPromo ? 'viewCardPromo' : 'viewCard', { product, secretKey });
    console.log('событие попадания карточки во вьюпорт отправлено');
  }

  sendOrderEvent(orderId: string, totalPrice: number, productIds: number[]) {
    this.sendEvent('purchase', { orderId, totalPrice, productIds });
    console.log('событие оформления заказа отправлено');
  }
}

export const eventService = new EventService();
