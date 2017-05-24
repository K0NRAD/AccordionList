import { ComponentsModule } from '../../components/components.module';
import { HomePage } from './home';
import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    ComponentsModule
  ],
  exports: [
    HomePage
  ]
})
export class HomeModule {}
