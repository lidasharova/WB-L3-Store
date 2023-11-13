import { sendEvent } from '../api';
import { ProductData } from 'types';
import { getProductSecretKey } from '../utils/helpers';

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
  }

  sendViewCardEvent(product: ProductData) {
    const secretKey = getProductSecretKey(product.id);
    const isPromo = product.log !== undefined;
    this.sendEvent(isPromo ? 'viewCardPromo' : 'viewCard', { product, secretKey });
  }

  sendBuyEvent(orderId: number, totalPrice: number, productIds: number[]) {
    this.sendEvent('purchase', { orderId, totalPrice, productIds });
  }
}

export const eventService = new EventService();
