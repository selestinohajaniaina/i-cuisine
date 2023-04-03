import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategorie } from './categorie';
import { AlertController, LoadingController } from '@ionic/angular';
import { env } from 'src/environments/environment';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.page.html',
  styleUrls: ['./categorie.page.scss'],
})
export class CategoriePage implements OnInit {

  private url = this.env.URL_SERVER;

  public err:string = '';

  public liste:ICategorie[]=[];

  public categorieName:string = '';

  public categorieCode:string = '';

  cat_code: string='';
  libelleCa: string='';

  constructor(private http: HttpClient, private alertController: AlertController, private loadingCtrl: LoadingController, private env: env) { 
  }
  
  //selection
  async getCategorie(){

    const loading = await this.loadingCtrl.create({
      message:'Chargement ...',
    });
    loading.present();

    this.http.get(`${this.url}/select/categorie/`)
    .subscribe((resultData: any)=>
    {
      this.liste = resultData.result;
      loading.dismiss();
      console.log(resultData.result);
    });
  }

  //ajout
  addCategorie(bodyData:{}){
    this.http.post(`${this.url}/insert/categorie`,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData,"categorie Successfully");
    });
    this.getCategorie();
    this.getCategorie();
  }

  //supression
  btnSup(id: number){
    this.presentAlert(id);
  }
  
  async presentAlert(id:number) {
    const alert = await this.alertController.create({
      message: 'voullez-vous la suprimer?',
      subHeader: 'Vous risquez de prerdre des données!',
      buttons: [
        {
          text: 'Annuler',
          role: 'Annuler',
        },
        {
          text: 'Suprimer',
          role: 'Suprimer',
        },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    if(role=='Suprimer'){
      this.http.delete(`${this.url}/delete/categorie/`+ id).subscribe((resultData: any)=>
      {
          console.log(resultData,"Categorie Deleted");
          this.getCategorie();
      });
      console.log(role);
    }

  }



   ngOnInit() {
    this.getCategorie();
    
  }

  btnAjout(){
    if(this.categorieName!=''&&this.categorieCode!=''){
      let newValue = {
        "cat_code" : this.categorieCode,
        "libelleCa" : this.categorieName,
      }

      this.addCategorie(newValue);
      this.categorieName='';
      this.categorieCode='';
    }else{
      this.err="Champs vide non valide.";
    }
  }

}
