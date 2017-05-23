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



