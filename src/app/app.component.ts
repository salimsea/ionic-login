import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    public navCtrl: NavController,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private storage: Storage
  ) {
    this.initializeApp()
  }

  async initializeApp() {
    await this.storage.create();

    this.platform.ready().then(() => {
      this.statusBar.styleDefault()
      this.splashScreen.hide();
    })

    this.storage.getItem('isLoggedIn').then((val:any) => {
      if (!val) {
        this.navCtrl.navigateRoot('/login')
      } else {
        this.navCtrl.navigateRoot('/tabs/tab1')
      }
    })
  }
}
