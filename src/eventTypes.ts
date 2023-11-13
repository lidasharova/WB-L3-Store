import { ProductData } from 'types';

// переход по страницам
export type RouteEvent = {
  type: 'route';
  payload: { url: string };
  timestamp: number;
};

// Просмотр товара в списке товаров (попадание карточек во вьюпорт)
export type ViewCardEvent = {
  type: 'viewCard' | 'viewCardPromo';
  payload: {
    product: ProductData;
    secretKey: string;
  };
  timestamp: number;
};

//const productProperties = { /* свойства товара */ };
// const viewType = productProperties.log ? 'viewCardPromo' : 'viewCard';

// Добавление товара в корзину
export type AddToCartEvent = {
  type: 'addToCard';
  payload: {
    product: ProductData;
  };
  timestamp: number;
};

// Оформление заказа
export type BuyEvent = {
  type: 'purchase';
  payload: {
    orderId: number; // айдиНовогоЗаказа
    totalPrice: number;
    productIds: number[]; //айдиТоваровМассивом
  };
  timestamp: number;
};
