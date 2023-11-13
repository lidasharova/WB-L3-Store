import { sendEvent } from '../api';
import { RouteEvent, ViewCardEvent, AddToCartEvent, BuyEvent } from 'src/eventTypes';
import { ProductData } from 'types';
import { getProductSecretKey } from './helpers';

// ф-ция для отправки события маршрута
export const sendRouteEvent = (url: string) => {
  const routeEvent: RouteEvent = {
    type: 'route',
    payload: { url },
    timestamp: Date.now()
  };
  sendEvent(routeEvent);
  console.log('отправили событие перехода по страницам');
};

// ф-ция для отправки события добавления товара в корзину
export const sendAddToCartEvent = (product: ProductData) => {
  const addToCartEvent: AddToCartEvent = {
    type: 'addToCard',
    payload: { product },
    timestamp: Date.now()
  };
  sendEvent(addToCartEvent);
};

// ф-ция для отправки события просмотра карточки (попадания во вью порт)
export const sendViewCardEvent = (product: ProductData) => {
  const secretKey = getProductSecretKey(product.id);
  const isPromo = product.log !== undefined;
  const viewCardEvent: ViewCardEvent = {
    type: isPromo ? 'viewCardPromo' : 'viewCard',
    payload: { product, secretKey },
    timestamp: Date.now()
  };
  sendEvent(viewCardEvent);
};

// ф-ция для отправки события оформления заказа
export const sendBuyEvent = (orderId: number, totalPrice: number, productIds: number[]) => {
  const BuyEvent: BuyEvent = {
    type: 'purchase',
    payload: { orderId, totalPrice, productIds },
    timestamp: Date.now()
  };
  sendEvent(BuyEvent);
};
