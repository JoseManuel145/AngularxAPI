import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule
  ],
  template: `
  <h1>Agregar Producto</h1>
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
  <button [disabled]="!productForm.form.valid" (click)="addProduct()">Guardar</button>
</div>
  ` ,
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {

  constructor(
    public dialogRef: MatDialogRef<AddProductComponent>,
    private service: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) { }
  closeDialog(): void {
    this.dialogRef.close();
  }

  addProduct(): void {
    const newProduct: Product = {
      id: 0,
      title: this.data.title ,
      price: this.data.price,
      description: this.data.description,
      image: this.data.image = ''
    };
    this.service.postProduct(newProduct).subscribe({
      next: (response: Product) => {
        console.log('Producto creado exitosamente:', response);
        this.dialogRef.close(newProduct);
        this.service.getProducts().subscribe({
          error: (error) => {
            console.error('Error al obtener productos:', error);
          }
        });
      },
      error: (error: any) => {
        console.error('Error al crear el producto:', error);
      }
    });
  }
}
