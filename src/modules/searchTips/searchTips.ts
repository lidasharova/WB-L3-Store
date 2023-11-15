import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './searchTips.tpl.html';
import { encodeQueryString } from '../../utils/helpers';

const urlSearch = 'https://www.wildberries.by/catalog?search=';
const tipNames = ['чехол iphone 13 pro', 'коляски agex', 'яндекс станция 2'];

type Tips = { name: string; link: string };

export class SearchTips {
  view: View;
  baseURL: string;

  constructor() {
    this.baseURL = urlSearch;
    this.view = new ViewTemplate(html).cloneView();
    this.renderTips();
  }

  private getDataTips = () => {
    const tips: Tips[] = tipNames.map((name) => ({
      name,
      link: `${this.baseURL}${encodeQueryString(name)}`
    }));
    return tips;
  };

  public attach($root: HTMLElement) {
    $root.prepend(this.view.root);
  }

  public renderTips() {
    // получаем данные о подсказках
    const tipLinks = this.getDataTips();

    // создаем массив с разметками подсказок
    const tipsHTML = tipLinks.map((tip) => {
      let templateTip = `<a href="${tip.link}">${tip.name}</a>`;
      return templateTip;
    });

    // составляем строку подсказок
    let tipsString;
    if (tipLinks.length > 1) {
      tipsString = `Например, ${tipsHTML.slice(0, -1).join(', ')} или ${tipsHTML.slice(-1)}`;
    } else {
      tipsString = `Например, ${tipsHTML[0]}`;
    }
    this.view.root.innerHTML = tipsString;
  }
}
