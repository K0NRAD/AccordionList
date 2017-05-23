import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { AccordionListComponent } from './accordion-list/accordion-list.component';

@NgModule({
  declarations: [
    AccordionListComponent,
  ],
  imports: [
    IonicModule
  ],
  exports: [
    AccordionListComponent
  ]
})
export class ComponentsModule { }
