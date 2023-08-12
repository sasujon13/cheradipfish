import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public products : any = [];
  public grandTotal !: number;
  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    document.addEventListener('contextmenu', function (event) {
      event.preventDefault();
    });
    this.cartService.getCartProducts()
    .subscribe((res: any)=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }
  removeCartItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }
  increaseQuantity(item: any) {
    this.cartService.changeQuantity(item.id, 1); // Increase quantity by 1
    this.grandTotal = this.cartService.getTotalPrice();
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      this.cartService.changeQuantity(item.id, -1); // Decrease quantity by 1 if greater than 1
      this.grandTotal = this.cartService.getTotalPrice();
    }
  }

}
