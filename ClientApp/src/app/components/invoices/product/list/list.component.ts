import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ProductServices } from '../../../../services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-product-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListProductComponent {

  constructor(private _changeDetectorRef: ChangeDetectorRef, private productService: ProductServices) { }

  public searchText;

  ngOnInit() {
    this.getList();
  }
  getList() {
    this.productService.getAll().subscribe({
      next: data => {
        console.log(data)
        this.setPagination(data);
      }, error: error => {
        console.log(error);
      }
    })
  }

  edit(product: any) {
    this.productService.product = product;
  }
  // PAGINATION
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataObs$: Observable<any>;

  setPagination(list) {
    this.dataSource = new MatTableDataSource<any>(list);
    this._changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataObs$ = this.dataSource.connect();
  }
}
