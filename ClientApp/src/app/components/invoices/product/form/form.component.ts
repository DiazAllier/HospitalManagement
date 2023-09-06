import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../../models/product.model';
import { ProductServices } from '../../../../services/product.service';
import { AppComponent } from '../../../../app.component';
import Swal from 'sweetalert2';
import { ListProductComponent } from '../list/list.component';

@Component({
  selector: 'app-product-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormProductComponent {

  public title_form;
  public product: Product = new Product();
  constructor(private productSvc: ProductServices, private activatedRoute: ActivatedRoute, private app: AppComponent,
    private listProduct: ListProductComponent) { }
  ngOnInit() {
    this.loadProduct();
  }
  loadProduct(): void {
    let id = this.productSvc.product.id;
    if (id > 0) {
      this.title_form = 'Edit product';
    } else {
      this.title_form = 'New product';
    }
    if (id) {
      this.productSvc.getById(id).subscribe({
        next: data => {
          this.product = data;
        }
      })
    }
  }
  save(): void {
    Swal.fire({
      title: 'Would you like to add product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Confirm!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productSvc.save(this.product).subscribe({
          next: data => {
            window.location.reload();
            this.app.Toast.fire({
              icon: 'success',
              title: 'Product saved'
            })
          },
          error: error => {
            this.app.Toast.fire({
              icon: 'error',
              title: error.message
            })
            console.log(error);
          }
        })
      }
    })

  }
}
