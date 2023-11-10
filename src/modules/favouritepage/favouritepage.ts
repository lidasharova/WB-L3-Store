import { Component } from '../component';
import html from './homepage.tpl.html';
import { favouriteService } from '../../services/favourite.service';
import { ProductList } from '../productList/productList';

class Favouritepage extends Component {
  favouriteProducts: ProductList;

  constructor(props: any) {
    super(props);
    this.favouriteProducts = new ProductList();
    this.favouriteProducts.attach(this.view.favourite);
  }

  async render() {
    try {
      const data = await favouriteService.get();
      console.log(data);
      this.favouriteProducts.update(data);
    } catch {
      console.error('Error fetching favourite products');
    }
  }
}

export const favouritepageComp = new Favouritepage(html);
