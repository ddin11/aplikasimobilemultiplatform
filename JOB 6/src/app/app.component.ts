import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { DatabaseProvider } from '../providers/database/database';

import { timer } from 'rxjs/observable/timer';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  showSplash = true;

  constructor(private platform: Platform,private statusBar: StatusBar,splashScreen: SplashScreen, private databaseProvider: DatabaseProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.databaseProvider.createDatabase();
      this.initializeApp();

      timer(5000).subscribe(() => this.showSplash = false)
    });
  }

  initializeApp() {
    this.statusBar.overlaysWebView(true);
    if (this.platform.is('android')) {
      this.statusBar.backgroundColorByHexString("#33000000");
    }
  }
}

