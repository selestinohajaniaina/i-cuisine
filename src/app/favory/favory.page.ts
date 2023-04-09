import { Component, OnInit } from '@angular/core';
import { IFavory } from './favory';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { env } from '../variable';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-favory',
  templateUrl: './favory.page.html',
  styleUrls: ['./favory.page.scss'],
})
export class FavoryPage implements OnInit {

  public listFavory:IFavory[]=[];
  private url = this.env.URL_SERVER; //'http://localhost:3000' 
  private id_user = localStorage.getItem('id_user');

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private env: env,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getAllFavory();
  }

  getAllFavory(){
    this.http.get(`${this.url}/select/favory`)
    .subscribe((resultData: any)=>
    {
      console.log(resultData.result);
      this.listFavory = resultData.result;
    });
  }

}
