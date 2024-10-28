import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProduct } from '../update-Product/update-product.component';
import { MatTableModule } from '@angular/material/table';
import { Product } from '../../models/product';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteProductDialog } from '../delete-product/delete-product.component';
import { ProductService } from '../../services/product.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { SharedModule } from '../../sharedModule.module';
import { CommonModule } from '@angular/common';
import { FindProductComponent } from '../find-product/find-product.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    MatTableModule,
    SharedModule,
    CommonModule
  ],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {
  displayedColumns: string[] = ['id', 'title', 'price', 'actions'];
  dataSource = new MatTableDataSource<Product>();
  products: Product[] = [];

  constructor(private dialog: MatDialog, private service: ProductService) { }

  ngOnInit(): void {
    this.getDataFromAPI();
  }

  getDataFromAPI(): void {
    this.service.getProducts().subscribe({
      next: (products: Product[]) => {
        this.products = [...products];
        this.updateTable();
      },
      error: (error) => {
        console.error('Error al obtener productos:', error);
      }
    });
  }

  deleteConfirm(product: Product) {
    const dialogRef = this.dialog.open(DeleteProductDialog, { data: product });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProduct(product.id);
      }
    });
  }

  editDialog(product: Product): void {
    const dialogRef = this.dialog.open(UpdateProduct, { data: { ...product } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateProduct(result);
      }
    });
  }

  addDialog(): void {
    const product: Product = { id: 0, title: '', price: 0, description: '', image: '' };
    const dialogRef = this.dialog.open(AddProductComponent, { data: product });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addProduct(result);
      }
    });
  }
  findDialog(): void {
    const dialogRef = this.dialog.open(FindProductComponent, {
      data: this.products
    });
  }
  

  addProduct(product: Product): void {
    product.id = this.products.length + 1;
    this.products.push(product);
    this.updateTable();
  }

  updateProduct(product: Product): void {
    const index = this.products.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.products[index] = product;
      this.updateTable();
    }
  }
  findProduct(id: number){
    const product = this.products.find(p => p.id === id);
    if(product)
      return product
    else
      return HttpErrorResponse
  }


  deleteProduct(id: number): void {
    this.products = this.products.filter(p => p.id !== id);
    this.updateTable();
  }

  updateTable(): void {
    this.dataSource.data = [];

    this.dataSource.data = [...this.products];
  }

}
