import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-personne',
  templateUrl: './personne.page.html',
  styleUrls: ['./personne.page.scss'],
})
export class PersonnePage implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient, private loadingCtrl: LoadingController) { }

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
  }


}
