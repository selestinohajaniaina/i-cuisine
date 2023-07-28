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

  public nbr_person:number;

  ngOnInit() {
    // this.id_recette = this.route.snapshot.params['id_plat'];
  }

  add() {
    
  }


}
