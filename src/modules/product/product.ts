import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import { formatPrice } from '../../utils/helpers';
import html from './product.tpl.html';
import { ProductData } from 'types';
import { eventService } from '../../services/event.service';

type ProductComponentParams = { [key: string]: any };

export class Product {
  view: View;
  product: ProductData;
  params: ProductComponentParams;
  observer: IntersectionObserver; //добавили observer в  карточку товара

  constructor(product: ProductData, params: ProductComponentParams = {}) {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    };
    this.product = product;
    this.params = params;
    this.view = new ViewTemplate(html).cloneView();
    this.observer = new IntersectionObserver(this.callbackObserver, options);
  }

  attach($root: HTMLElement) {
    $root.appendChild(this.view.root);
  }

  callbackObserver = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        eventService.sendViewCardEvent(this.product);
      }
    });
  };

  render() {
    const { id, name, src, salePriceU } = this.product;

    this.view.root.setAttribute('href', `/product?id=${id}`);
    this.view.img.setAttribute('src', src);
    this.view.title.innerText = name;
    this.view.price.innerText = formatPrice(salePriceU);

    if (this.params.isHorizontal) this.view.root.classList.add('is__horizontal');
    this.observer.observe(this.view.root);
  }
}
