import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';

export const routes: Routes = [
  { path: '', component: MainpageComponent },
  { path: 'productos', component: ProductListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
