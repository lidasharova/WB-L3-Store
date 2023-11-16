import './icons';
import Router from './router';
import { cartService } from './services/cart.service';
import { userService } from './services/user.service';
import { favouriteService } from './services/favourite.service';

new Router();
cartService.init();
userService.init();
favouriteService.init();

setTimeout(() => {
  document.body.classList.add('is__ready');
}, 250);
