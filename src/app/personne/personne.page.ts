import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-personne',
  templateUrl: './personne.page.html',
  styleUrls: ['./personne.page.scss'],
})
export class PersonnePage implements OnInit {

  private url = 'http://localhost:3000';

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  public nbrPerson:number =0;
  public id_recette:number=0;
  public rating :number =0;
  public minute:number = 0;
  public dificulte = '';
  public error = '';
  public msg = '';
  public data : {
    id_plat:number,
    min:number,
    dificulte:string,
    rating:number
  }={
    id_plat:this.id_recette,
    min:0,
    dificulte:"",
    rating:0
  };

  ngOnInit() {
    this.id_recette = this.route.snapshot.params['id_plat'];
    console.log(this.id_recette);
  }

  btnSend(){
    if(this.rating!=0&&this.minute>0&&this.dificulte!=''){
      this.data = {
        id_plat:this.id_recette,
        min: this.minute,
        dificulte:this.dificulte,
        rating:this.rating
      }
      this.sendFeedback(this.data);
      this.rating  =0;
      this.minute= 0;
      this.dificulte = '';
      this.msg = 'Merci de votre note!';
    }else{
      this.error = 'Champs vide non valide!';
    }
  }

  sendFeedback(bodyData:{}){
    //add new user
    this.http.post(`${this.url}/insert/feedback`,bodyData).subscribe((resultData: any)=>
      {
          console.log(resultData,"signup Successfully");
      });
  }

}
