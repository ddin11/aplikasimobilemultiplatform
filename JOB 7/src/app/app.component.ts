import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { DatabaseProvider } from '../providers/database/database';

import { timer } from 'rxjs/observable/timer';

declare var FCMPlugin;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  showSplash = true;

  constructor(private platform: Platform,private statusBar: StatusBar,splashScreen: SplashScreen, private databaseProvider: DatabaseProvider) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.databaseProvider.createDatabase();
      this.initializeApp();

      FCMPlugin.onTokenRefresh(function (token) {
        //alert(token);
      });

      FCMPlugin.getToken(function (token) {
        //alert(token);
      });

      FCMPlugin.subscribeToTopic('promosi');
      FCMPlugin.onNotification(function (data) {
        if(data.wasTapped) {
          alert(JSON.stringify(data));
        } else {
          alert(JSON.stringify(data));
        }
      });

      FCMPlugin.createNotificationChannelAndroid({
        id: "urgent_alert",
        name: "Urgent Alert",
        description: "Very urgent message alert",
        importance: "high",
        visibility: "public",
        sound: "alert_sound",
        lights: true,
        vibration: true
      });

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

