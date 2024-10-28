import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';  


@Component({
  selector: 'app-product-dialog',
  styleUrl: 'update-product.component.scss',
  template: `
  <h1>Editar Producto</h1>
<div>
  <form #productForm="ngForm">
    <div>
      <label for="title">Título</label>
      <input id="title" [(ngModel)]="data.title" name="title" required>
    </div>

    <div>
      <label for="price">Precio</label>
      <input id="price" [(ngModel)]="data.price" name="price" type="number" required>
    </div>

    <div>
      <label for="description">Descripción</label>
      <textarea id="description" [(ngModel)]="data.description" name="description" required></textarea>
    </div>
  </form>
</div>

<div>
  <button (click)="closeDialog()">Cancelar</button>
  <button [disabled]="!productForm.form.valid" (click)="updateProduct()">Actualizar</button>
</div>

  `,
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule
  ]
})
export class UpdateProduct {
  constructor(
    public dialogRef: MatDialogRef<UpdateProduct>,
    private service: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) { }
  closeDialog(): void {
    this.dialogRef.close();
  }

  updateProduct(): void {
    const updatedProduct: Product = {
      id: this.data.id, 
      title: this.data.title,
      price: this.data.price,
      description: this.data.description,
      image: this.data.image || ''
    };
  
    this.service.updateProduct(updatedProduct).subscribe({
      next: (response: Product) => {
        console.log('Producto actualizado exitosamente:', response);
      },
      error: (error: any) => {
        console.error('Error al actualizar el producto:', error);
      }
    });
  } 
}