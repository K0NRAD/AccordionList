import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AccordionItem } from '../../models/accordion-item/accordion-item.interface';
import { AccordionService } from '../../providers/accordion-service';
import { Component } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  accordionItems: AccordionItem[];

  constructor(private accordionService: AccordionService, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.accordionService.loadArccordionItems()
      .subscribe(respose => {
        this.accordionItems = respose
        console.log("AccordionItems: " + this.accordionItems);
      });
  }

  selectedItem(item: AccordionItem) {
    console.log(item);
  }
}
