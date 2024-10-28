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
  template: `
    <h1 mat-dialog-title>Deseas borrar el producto?</h1>
    <div mat-dialog-content>
      <h3>Id: {{data.id}}</h3>
      <h3>Nombre: {{data.title}}</h3>
      <h3>Precio: {{data.price}}</h3>
      <h3>Descripcion: {{data.description}}</h3>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="delete()">Eliminar</button>
      <button mat-button (click)="closeDialog()">Cerrar</button>
    </div>
  `,
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
  ]
})
export class DeleteProductDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteProductDialog>,
    private service: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }
  delete(): void {
    if (this.data.id) {
      this.service.deleteProduct(this.data.id).subscribe({
        next: () => {
          console.log("Producto eliminado exitosamente");
        },
        error: (error) => {
          console.error("Error eliminando el producto:", error);
        }
      });
    } else {
      console.error('El ID del producto no es válido o está indefinido');
    }
  }
}
