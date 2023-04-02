import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { env } from 'src/environments/environment';

@Component({
  selector: 'app-personne',
  templateUrl: './personne.page.html',
  styleUrls: ['./personne.page.scss'],
})
export class PersonnePage implements OnInit {

  private url = this.env.URL_SERVER;

  constructor(private route: ActivatedRoute, private http: HttpClient, private loadingCtrl: LoadingController, private env: env) { }

  public nbrPerson:number =0;
  public id_recette:number=0;
  public rating :number =0;
  public nom_plat:string = '';
  public minute:number = 0;
  public dificulte = '';
  public error = '';
  public msg = '';
  public data : {
    id_plat:number,
    min:number,
    dificulte:string,
    rating:number,
    nom_plat:string
  }={
    id_plat:this.id_recette,
    min:0,
    dificulte:"",
    rating:0,
    nom_plat:""
  };

  ngOnInit() {
    this.id_recette = this.route.snapshot.params['id_plat'];
    this.getPlat();
  }

  //get plat where id=id_recette
  getPlat(){
    this.http.get(`${this.url}/select/plat/${this.id_recette}`)
    .subscribe((resultData: any)=>
    {
      this.nom_plat = resultData.result[0].nom_plat;
      console.log(this.nom_plat);
    });
  }

  btnSend(){
    if(this.rating!=0&&this.minute>0&&this.dificulte!=''){
      this.data = {
        id_plat:this.id_recette,
        min: this.minute,
        dificulte:this.dificulte,
        rating:this.rating,
        nom_plat:this.nom_plat
      }
      this.sendFeedback(this.data);
      this.rating  =0;
      this.minute= 0;
      this.dificulte = '';
    }else{
      this.error = 'Champs vide non valide!';
    }
  }

  async sendFeedback(bodyData:{}){

    const loading = await this.loadingCtrl.create({
      message:'Chargement ...',
    });
    loading.present();
    
    //add new user
    this.http.post(`${this.url}/insert/feedback`,bodyData).subscribe((resultData: any)=>
      {
          console.log(resultData,"signup Successfully");
          loading.dismiss();
          this.msg = "Merci de votre note!";
      });
  }

}
