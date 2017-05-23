# AccordionList

This tutorial show how you build a AccordionList component, step by step. We use th lazy loading feature from Ionic 3.

**1. Create a new Ionic 3 app** 

We start with a new **blank** Ionic 3 application. Open a command terninal an type this command.

```
ionic start AccordionList blank --v2
```

That command will create a new Ionic 3 app, using the default template 'blank'. After the command is finished, goto the new created folder AccordionList.

```
cd AccordionList
```

Run the Ionic 3 app on the browser.

```
ionic serve -l
```

You see this blank Ionic 3 app.

![image](https://cloud.githubusercontent.com/assets/3606037/26359923/035295b0-3fd7-11e7-8ca4-c27568f515a0.png)

We will use lazy loading the pages, so we delete the folder ***src/pages/home***, and generate a new one with the Ionic page generator. After you removed the **home page**, you generate a new one with the following command.

```
ionic g page Home
``` 

I use VSCode for development with Ionic, if you do so, open the project with this command.

```
code .
```

You see on the left, the generated new HomePage.

![image](https://cloud.githubusercontent.com/assets/3606037/26360495/8158c1cc-3fd8-11e7-8d17-7c10c85527a8.png)

We have to do some changes that lazy loading of the HomePage does work. Open the file ***src/pages/home/home.ts***. Rename the class name from Home to HomePage. Open the file ***src/pages/home/home.module.ts***, and change the Home in HomePage

```
import { HomePage} from './home';
import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
  exports: [
    HomePage
  ]
})
export class HomeModule {}
```

If you using Ionic-Cli >= 3.1.2, this is not necessary. 

Open the file ***src/app/app.modules.ts***, and remove the import of the HomePage.

```
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
```

Open the file ***src/app/app.component.ts***, remove the HomePage import and change the ***rootPage:any = HomePage*** to ***rootPage:string = 'HomePage'; 

After this changes you'l see the following view.

![image](https://cloud.githubusercontent.com/assets/3606037/26361455/5071e6da-3fdb-11e7-924c-14c61e5b69fe.png)

**2. Build a accordion list** 

Create an interface named **AccordionItem**. Create a **models** folder, into the models folder create a subfolder with the name accordion-item, and in the accordion-item folder create a file named **accordion-item.interface.ts**. The interface has two attributs, title and description.

```
export interface AccordionItem {
    title: string;
    description: string;
}
```
 Now we create the acco rdion item list, as json file. We create a 
 folder **data** in the folder ***src/assets*** folder, in this folder we create a subfolder named **accordion-items**, and in this folder we create a file named accordion-items.json. The content of the file ***src/assets/data/accordion-item/accordion-item.json*** see you here.

```
[
    {"title": "Title 01", "description": "Description 01001"},
    {"title": "Title 02", "description": "Description 02001"},
    {"title": "Title 03", "description": "Description 03001"},
    {"title": "Title 04", "description": "Description 04001"},
    {"title": "Title 05", "description": "Description 05001"}
]
```

We need an service to fetch the **accordion-items**. With the provider generator of Ionic 3, we build an service. Type the following command.

```
ionic g provider AccordionService
```

After creation we open the file ***src/providers/accordion-service.ts***. In the service we add the methode **loadArccordionItems**.

```
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { AccordionItem } from "../models/accordion-item/accordion-item.interface";

@Injectable()
export class AccordionService {

  constructor(public http: Http) {
  }

  loadArccordionItems(): Observable<AccordionItem[]> {
    return this.http.get('assets/data/accordion-items/accordion-items.json')
      .map((respons: Response) => respons.json());
  }
}
```

Register this service in 'app.module.ts' by open and edit ***src/app/app.module.ts*** then add this import.

```
import { AccordionService } from "../providers/accordion-service";
```

Add 'HttpModule' in '@NgModule' imports.

```
...
imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
]
...
```

Add **AccordionService** in '@NgModule' providers.

```
...
providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AccordionService
]
...
```

Now we add the accordion service to the **HomePage**, we will load the data, when the HomePage will loaded.

```
import { AccordionItem } from '../../models/accordion-item/accordion-item.interface';
import { AccordionService } from '../../providers/accordion-service';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
      .subscribe(respose => this.accordionItems = respose);
  }
}
```

We add an **ion-list** to the content of **home.html**.

```
...
<ion-list no-lines>
    <ion-item *ngFor="let item of accordionItems">
        {{item.title}}
        <div>
        {{item.description}}
        </div>
    </ion-item>
</ion-list>
...
```
After saving the changed files, the home page looks like this.

![image](https://cloud.githubusercontent.com/assets/3606037/26364367/64e69486-3fe4-11e7-9476-2ffcf03e8fc3.png)

Now wie add the functions to toggle the accordion list in the file ***src/pages/home/home.ts***.

Previous we add an attribute named **showAccordionItem**.

```
  showAccordionItem = null;
```
Next we add the two functions .

```
  ...
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
  ...
```

Now we adjust the home.html file so that the accordion item entries toggle. We modify the ion-content as shown below.

```
...
<ion-list no-lines>
    <ion-item *ngFor="let item of accordionItems; let i = index">
      <h2>
        <ion-item (click)="toggleAccordionItem(i)" [color]="isAccordionItemShown(i) ? 'primary' : '' ">
          <ion-icon [name]="isAccordionItemShown(i) ? 'arrow-dropdown' : 'arrow-dropright'" item-left></ion-icon>
          {{item.title}}
        </ion-item>
        <div *ngIf="isAccordionItemShown(i)">
          {{item.description}}
        </div>
      </h2>
    </ion-item>
</ion-list>
...
```

The home page now looks as follows.

![image](https://cloud.githubusercontent.com/assets/3606037/26374570/09d0bff0-4006-11e7-9427-ed38bf0dc1bc.png)

**3. Refactor accordion list to a component**

First we build the accordion list component with Ionic component generator.
Type the command in your terminal.

```
ionic g component AccordionList
``` 

After finished the component generation we remove the file ***src/components/accordion-list.module.ts***

In the folder ***src/components*** wie add a file named **components.module.ts**.