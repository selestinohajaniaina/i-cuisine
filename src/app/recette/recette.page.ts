import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IRecette } from './recette';

@Component({
  selector: 'app-recette',
  templateUrl: './recette.page.html',
  styleUrls: ['./recette.page.scss'],
})
export class RecettePage implements OnInit {

  private url = 'http://localhost:3000';
  public liste:IRecette[]=[];

  public nom_plat:string = '';
  public err:string = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getRecette();
  }

  //selection
  getRecette(){
    this.http.get(`${this.url}/select/plat/`)
    .subscribe((resultData: any)=>
    {
      this.liste = resultData.result;
      
      console.log(resultData.result);
    });
  }
  //ajout
  addRecette(bodyData:{}){
    this.http.post(`${this.url}/insert/recette`,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData,"categorie Successfully");
    });
  }

  btnAjout(){
    if(this.nom_plat!=''){
      let newValue = {
        "nom_plat" : this.nom_plat,
      }

      this.addRecette(newValue);
      this.nom_plat='';
      this.getRecette();
      this.getRecette();
      this.err="";
    }else{
      this.err="Champs vide non valide.";
    }
  }

}
