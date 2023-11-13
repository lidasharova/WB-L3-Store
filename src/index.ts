import './icons';
import Router from './router';
import { cartService } from './services/cart.service';
import { userService } from './services/user.service';
import { sendRouteEvent } from './utils/event';

new Router();

cartService.init();
userService.init();


// прослушка события изменения URL
window.onload = () => {
  const currentUrl = location.href; //получили URL
  console.log(currentUrl);
  sendRouteEvent(currentUrl);
};

setTimeout(() => {
  document.body.classList.add('is__ready');
}, 250);
