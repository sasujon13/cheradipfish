import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../service/order.service';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  
  divisions: string[] = [];
  districts: string[] = [];
  thanas: string[] = [];
  selectedDivision: string = '';
  selectedDistrict: string = ''; // Define the selectedDistrict property
  selectedThana: string = '';

  userName: string = '';
  mobileNo: string = '';
  address: string = '';
  paymentMethod: string = 'cash';

  public products : any = [];
  public grandTotal !: number;
  public grandDiscount !: number;
  constructor(private apiService: ApiService, private cartService : CartService, private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.fetchDivisions();
    this.apiService.getDivisions().subscribe(divisions => {
      this.divisions = divisions;
    });
    document.addEventListener('contextmenu', function (event) {
      event.preventDefault();
    });
    this.cartService.getCartProducts()
    .subscribe((res: any)=>{
      this.products = res;
      this.grandTotal = this.cartService.grandTotal();
      this.grandDiscount = this.cartService.grandDiscount();
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
    this.grandTotal = this.cartService.grandTotal();
    this.grandDiscount = this.cartService.grandDiscount();
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      this.cartService.changeQuantity(item.id, -1); // Decrease quantity by 1 if greater than 1
      this.grandTotal = this.cartService.grandTotal();
      this.grandDiscount = this.cartService.grandDiscount();
    }
  }
  savedPrice(item: any): number {
    return Math.ceil(item.quantity * (item.price * 100 / (100 - item.discount) - item.price));
  }
  
  totalPrice(item: any): number {
    return Math.ceil(item.quantity * item.price);
  }
  productPrice(item: any): number {
    return Math.ceil(item.price * 100 / (100 - item.discount));
  }
  confirmOrder(): void {
    // Prepare order details object
    const orderDetails = {
      userName: this.userName,
      mobileNo: this.mobileNo,
      address: this.address,
      paymentMethod: this.paymentMethod,
      // Add other relevant order data here
      products: this.products // Assuming you have this array
    };

    // Call the service to save the order
    this.orderService.saveOrder(orderDetails).subscribe(
      response => {
        // Order saved successfully
        console.log('Order saved:', response);
        // Redirect to a thank you or order confirmation page
        this.router.navigate(['/order-confirmation']);
      },
      error => {
        // Handle error if order saving fails
        console.error('Error saving order:', error);
        // You can show an error message to the user
      }
    );
  }

  onDivisionChange(): void {
    this.apiService.getDistricts(this.selectedDivision).subscribe(districts => {
      this.districts = districts;
      this.selectedDistrict = ''; // Reset selected district
    });
  }

  onDistrictChange(): void {
    this.apiService.getThanas(this.selectedDivision, this.selectedDistrict).subscribe(thanas => {
      this.thanas = thanas;
    });
  }

  fetchDivisions() {
    this.apiService.getDivisions().subscribe(
      (data: string[]) => {
        this.divisions = data; // Assign divisions data
        console.log(this.divisions); // Log divisions to console
      },
      error => {
        console.error('Error fetching divisions:', error);
      }
    );
  }
  fetchDistricts() {
    if (this.selectedDivision) {
      console.log('Fetching districts...');
      this.apiService.getDistricts(this.selectedDivision).subscribe(
        (data: string[]) => {
          console.log('Districts:', data);
          this.districts = data;
        },
        error => {
          console.error('Error fetching districts:', error);
        }
      );
    }
  }
  
  fetchThanas() {
    if (this.selectedDivision && this.selectedDistrict) {
      console.log('Fetching thanas...');
      this.apiService.getThanas(this.selectedDivision, this.selectedDistrict).subscribe(
        (data: string[]) => {
          console.log('Thanas:', data);
          this.thanas = data;
        },
        error => {
          console.error('Error fetching thanas:', error);
        }
      );
    }
  }

}
