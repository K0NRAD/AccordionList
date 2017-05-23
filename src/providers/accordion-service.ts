import 'rxjs/add/operator/map';

import { Http, Response } from '@angular/http';

import { AccordionItem } from "../models/accordion-item/accordion-item.interface";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AccordionService {

  constructor(public http: Http) {
  }

  loadArccordionItems(): Observable<AccordionItem[]> {
    return this.http.get('assets/data/accordion-items/accordion-items.json')
      .map((respons: Response) => respons.json());
  }
}
