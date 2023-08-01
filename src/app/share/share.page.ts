import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-share',
  templateUrl: './share.page.html',
  styleUrls: ['./share.page.scss'],
})
export class SharePage implements OnInit {

  public searchQuery: string = 'legume';
  private appId: string = 'ae088893';
  private apiKey: string = 'd58abe14ee8a3c6d8a6ffb5bdf63ebef';
  public data: any;
  public loaded: boolean = true;

  constructor(
    private alertController: AlertController,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.fetchWeb();
  }

  fetchWeb() {
    this.http.get(`https://api.edamam.com/search?q=${this.searchQuery||'legume'}&app_id=${this.appId}&app_key=${this.apiKey}`)
    .subscribe(async(res:any)=>{
      if(res){
        this.data = res.hits;
        console.log(await res);
        this.loaded = false;
      } else {
        console.log("error")
      }
    })
  }

  barSearch(){
    this.loaded = true;
    setTimeout(()=>this.fetchWeb(),2000);
  }

  async open(url: string) {
    const alert = await this.alertController.create({
      header: 'Rediriger vers ?',
      message: url,
      buttons: [
        {text: 'Annuler', role: 'Annuler'},
        {text: 'Suivre', role: 'Suivre'},
      ]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    if(role=='Suivre'){
      location.href = url;
    }
  }

}
