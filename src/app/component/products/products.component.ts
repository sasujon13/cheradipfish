import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import { ChoiceService } from 'src/app/service/choice.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  showCard: boolean = true;
  showChoice: boolean = true;
  public productList: any;
  public cartProductList: any;
  public choiceProductList: any;
  public filterCategory: any;
  searchKey: string = "";

  SIZE = [
    { label: 'All', value: '' },
    { label: 'XL', value: 'xl' },
    { label: 'L', value: 'l' },
    { label: 'M', value: 'm' },
    { label: 'S', value: 's' },
    { label: 'XS', value: 'xs' }
  ];

  constructor(private api: ApiService, private cartService: CartService, private choiceService: ChoiceService) { }

  ngOnInit(): void {
    this.api.getProducts()
      .subscribe(res => {
        this.productList = res;
        this.cartProductList = res;
        this.choiceProductList = res;
        this.filterCategory = res;
        this.productList.forEach((a: any) => {
          const cartState = localStorage.getItem(`cartState_${a.id}`);
          const choiceState = localStorage.getItem(`choiceState_${a.id}`);
          if (choiceState === 'true') {
            a.love = true;
          }
          if (a.size === "XS") {
            a.size = "xs";
          } else if (a.size === "S") {
            a.size = "s";
          } else if (a.size === "M") {
            a.size = "m";
          } else if (a.size === "L") {
            a.size = "l";
          } else if (a.size === "XL") {
            a.size = "xl";
          }
          a.add_to_cart = cartState === 'true';
          a.add_to_choice = choiceState === 'true';
          Object.assign(a, { quantity: 1, total: a.price });
        });
      });
    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
    this.choiceService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }
  addtocart(item: any) {
    const sessionCartItems = JSON.parse(sessionStorage.getItem('sessionCartItems') || '[]');

    if (!sessionCartItems.find((storedItem: any) => storedItem.id === item.id)) {
      this.cartService.addtocart(item);
      item.add_to_cart = true;
      sessionCartItems.push(item);
      sessionStorage.setItem('sessionCartItems', JSON.stringify(sessionCartItems));
      localStorage.setItem(`cartState_${item.id}`, 'true');
    }
  }

  addtochoice(item: any) {
    const sessionChoiceItems = JSON.parse(sessionStorage.getItem('sessionChoiceItems') || '[]');

    if (!sessionChoiceItems.find((storedItem: any) => storedItem.id === item.id)) {
      this.choiceService.addtochoice(item);
      item.love = true;
      sessionChoiceItems.push(item);
      sessionStorage.setItem('sessionChoiceItems', JSON.stringify(sessionChoiceItems));
      localStorage.setItem(`choiceState_${item.id}`, 'true');
    }
    else {
      this.removeChoiceItem(item);
    }
  }
  removeChoiceItem(item: any) {
    this.choiceService.removeChoiceItem(item);
    item.love = false;
  }
  filterItem() {
    this.showCard = true;
    this.showChoice = true;
  }
  filter(size: string) {
    this.filterCategory = this.productList.filter((a: any) => a.size === size || size === '');
  }
  productPrice(item: any): number {
    return Math.ceil(item.price * 100 / (100 - item.discount));
  }
}
