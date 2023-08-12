import { Component, Injector, OnInit } from '@angular/core';
import { Item } from '../../models/item.model';
import { ItemService } from 'src/app/service/item.service';

import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];

  constructor(
    private itemService: ItemService,
    private injector: Injector,
    private api : ApiService, 
    private cartService : CartService
  ) { }

  ngOnInit(): void {
    this.itemService.getItems().subscribe(
      (items: Item[]) => {
        this.items = items;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // addToCart(item: Item): void {
  //   item.add_to_cart = true;
  // }
  addToCart(item: any): void {
    item.add_to_cart = true;
    this.cartService.addtoCart(item);
  }
  getItemClass() {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 575) {
      return 'one-item-per-row';
    } else if (screenWidth <= 1199) {
      return 'two-items-per-row';
    } else if (screenWidth <= 1599) {
      return 'three-items-per-row';
    } else {
      return 'five-items-per-row';
    }
  }
}