import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-personne',
  templateUrl: './personne.page.html',
  styleUrls: ['./personne.page.scss'],
})
export class PersonnePage implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient, private loadingCtrl: LoadingController, private router: Router) { }

  public nbr_person:number;
  public rec_id:number;

  ngOnInit() {
    this.rec_id = this.route.snapshot.params['id_plat'];
  }

  add() {
    this.router.navigate(['../detail', this.rec_id], { queryParams: { person: this.nbr_person } });
  }


}
