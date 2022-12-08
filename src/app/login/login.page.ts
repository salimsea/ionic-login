import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email_address: string = "";
  password: string = "";
  disabledButton: boolean = false;

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private storage: Storage,
    private navCtrl: NavController
  ) { }

  ngOnInit(
  ) {
  }

  async presentToast(a:any) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500
    });
    toast.present();
  }

  async trylogin() {
    if (!this.email_address) {
      this.presentToast('email tidak boleh kosong')
    } else if (!this.password) {
      this.presentToast('password tidak boleh kosong')
    }

    this.disabledButton = true;
    const loader = await this.loadingCtrl.create({
      message:"Sedang memuat..."
    })
    loader.present();

    const fd = new FormData();
    fd.append('email_address', this.email_address);
    fd.append('password', this.password);

    try {
      const res = await axios.post('xxxxxxx', fd);
      var data = res.data;
      if (data.status) {
        loader.dismiss();
        this.disabledButton = false;
        this.presentToast('login sukses');
        this.storage.setItem('isLoggedIn', data.data);
        this.navCtrl.navigateRoot('/tabs/tab1');
      } else {
        this.presentToast(data.message)
      }
    } catch (error) {
        this.presentToast('Terjadi Kesalahan')
      
    }

  }

}
