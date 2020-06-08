import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthProvider } from '../../providers/auth/auth';
import { RegisterPage } from '../register/register';
import { AlertProvider } from '../../providers/alert/alert';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {
    'email': '',
    'password': '',
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authProvider: AuthProvider,
    private alertProvider: AlertProvider) {
  }

  login() {
    this.authProvider.login(this.user).subscribe(
      result => {
        this.alertProvider.showToast("Berhasil Login");
        this.navCtrl.setRoot(TabsPage);
      },
      error => {
        this.alertProvider.showToast("Username dan Password Salah!!")
      });
  }

  showRegisterForm() {
    this.navCtrl.push(RegisterPage);
  }

  ionViewDidLoad() {
    let user = localStorage.getItem('user');
    if (user != null) {
      this.navCtrl.setRoot(TabsPage);
    }
  }
}
