import { Component } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Capacitor } from '@capacitor/core';
Capacitor.convertFileSrc("facebook.com");

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private iab:InAppBrowser) {
const browser = this.iab.create('https://ionicframework.com/');
browser.on('loadstop').subscribe(event => {
   browser.insertCSS({ code: "body{color: red;" });
});

browser.show();
  }

}
