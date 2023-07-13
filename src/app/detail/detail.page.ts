import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  public nbrPerson:number = 0;
  public qteProduit:number = 0;
  public id_recette:number = 0;
  public varProduit:string = '';
  public nom_recette:string = '';
  public err:string = '';
  public produit:string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private alertController: AlertController, private loadingCtrl: LoadingController) { }

  ngOnInit() {

    this.id_recette = this.route.snapshot.params['id_recette'];

    this.route.queryParams.subscribe(params => {
      this.nbrPerson = params['person'];
    });
    console.log(this.nbrPerson + " r= " + this.id_recette);
  }


}