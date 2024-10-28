import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricePipe } from './pipes/PricePipe.pipe';
import { idPipe } from './pipes/id-pipe.pipe';
@NgModule({
  declarations: [PricePipe, idPipe],
  imports: [CommonModule],
  exports: [PricePipe, idPipe]
})
export class SharedModule { }
