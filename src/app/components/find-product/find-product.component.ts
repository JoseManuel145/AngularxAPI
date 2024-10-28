import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../models/product';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-find-product',
  styleUrl: 'find-product.component.scss',
  template: `
    <h2>Buscar Producto</h2>
    <form #productForm="ngForm" (ngSubmit)="findProduct()">
      <div>
        <label>ID del Producto</label>
        <input [(ngModel)]="productId" name="productId" required>
      </div>
      <button color="primary" type="submit">Buscar</button>
    </form>
    @if (product) {<div>
      <h3>Producto Encontrado:</h3>
      <p><strong>ID:</strong> {{ product.id }}</p>
      <p><strong>Nombre:</strong> {{ product.title }}</p>
      <p><strong>Precio:</strong> {{ product.price }}</p>
    </div>}
    @if(errorMessage){
      <div>
      <p style="color:red">{{ errorMessage }}</p>
    </div>
    }
    
  `,
  standalone: true,
  imports: [
    MatFormField,
    MatInputModule,
    FormsModule
  ]
})
export class FindProductComponent {
  productId!: number;
  product: Product | null = null;
  errorMessage: string | null = null;

  constructor(
    private dialogRef: MatDialogRef<FindProductComponent>,
    @Inject(MAT_DIALOG_DATA) private products: Product[],
    private service: ProductService
  ) {
    console.log("el ultimo id es"  + products[products.length - 1].id);
  }
  findProduct() {
    const idToFind = Number(this.productId);
    console.log("Buscando ID:", idToFind);

    this.service.getProductById(idToFind).subscribe({
      next: (product) => {
        console.log("si existe");
        this.product = product;
        this.errorMessage = null;
      },
      error: (err) => {
        console.log("No existe");
        this.product = null;
        this.errorMessage = 'Producto no encontrado.';
        console.error(err);
      }
    });
  }
}