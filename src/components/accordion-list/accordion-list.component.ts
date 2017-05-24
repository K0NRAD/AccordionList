import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AccordionItem } from '../../models/accordion-item/accordion-item.interface';

@Component({
  selector: 'app-accordion-list',
  templateUrl: 'accordion-list.component.html'
})
export class AccordionListComponent {
  @Input() accordionItems: AccordionItem[];
  @Output() accordionItem: EventEmitter<AccordionItem>;

  showAccordionItem = null;
  constructor() {
    this.accordionItem = new EventEmitter<AccordionItem>()
  }

  toggleAccordionItem(item) {
    if (this.isAccordionItemShown(item)) {
      this.showAccordionItem = null;
    } else {
      this.showAccordionItem = item;
    }
  }

  isAccordionItemShown(item) {
    return this.showAccordionItem === item;
  }

  selectItem(item: AccordionItem) {
    this.accordionItem.emit(item);
  }
}
