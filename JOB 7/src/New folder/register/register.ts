import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user/user-model';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = new User();
  response : any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private alertProvider: AlertProvider,
    private authProvider: AuthProvider) {
  }

  //fungsi yang menangani pengiriman data ke provider auth
  register() {
    if (this.user.password == this.user.c_password) {
      this.authProvider.register(this.user).subscribe(
        result => {
          this.alertProvider.showToast("Register Berhasil!!")
          this.navCtrl.pop();
          console.log(result);
        },
        error => {
          this.response = error.error;
          console.log(error.error);
          this.alertProvider.showToast("Registrasi Gagal :( , coba dengan email lain!!")
        }
      )
    } else {
      this.alertProvider.showToast("Password Harus Sama!!")
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
