import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategorie } from './categorie';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.page.html',
  styleUrls: ['./categorie.page.scss'],
})
export class CategoriePage implements OnInit {

  public liste:ICategorie[]=[];

  public categorieName:string = '';

  public categorieCode:string = '';

  cat_code: string='';
  libelleCa: string='';

  constructor(private http: HttpClient) { 
  }
  
  //selection
  getCategorie(){
    this.http.get("http://localhost:3000/select/categorie/")
    .subscribe((resultData: any)=>
    {
      this.liste = resultData.result;
      
      console.log(resultData.result);
    });
  }
  //ajout
  addCategorie(bodyData:{}){
    this.http.post("http://localhost:3000/insert/categorie",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData,"categorie Successfully");
    });
  }
  //supression
  btnSup(id: number)
  {
    this.http.delete("http://localhost:3000/delete/categorie/"+ id).subscribe((resultData: any)=>
    {
        console.log(resultData,"Categorie Deleted");
        this.getCategorie();
    });
  }

  ngOnInit() {

    this.getCategorie()
    
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
      this.getCategorie();
      this.getCategorie();
    }
  }

}
