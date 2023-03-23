import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ICategorie } from '../categorie/categorie';
import { IProduit } from './produit';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.page.html',
  styleUrls: ['./produit.page.scss'],
})
export class ProduitPage implements OnInit {

  public err:string = '';

  public libellePro:string = '';
  public unite:string = '';
  public codeCa:string = '';

  constructor(private http: HttpClient) { }

  public liste: IProduit[]=[];
  public listeCat: ICategorie[]=[];

  btnAjout(){
    if(this.libellePro!=''&&this.unite!=''&&this.codeCa!=''){
      let newValue = {
        "libellePro" : this.libellePro,
        "codeCa" : this.codeCa,
        "unite" : this.unite,
      }

      this.addProduit(newValue);
      console.log(newValue);
      this.libellePro='';
      this.codeCa='';
      this.unite='';
      this.getProduit();
      this.getProduit();
    }else{
      this.err="Champs vide non valide.";
    }
  }

  ngOnInit() {
    this.getProduit();
    this.getCategorie();
  }

  //ajout
  addProduit(bodyData:{}){
    this.http.post("http://localhost:3000/insert/produit",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData,"produit Successfully");
    });
  }
  //supression
  btnSup(id: number)
  {
    this.http.delete("http://localhost:3000/delete/produit/"+ id).subscribe((resultData: any)=>
    {
        console.log(resultData,"produit Deleted");
        this.getProduit();
    });
  }

    //selection des liste de produit
    getProduit(){
      this.http.get("http://localhost:3000/select/produit/")
      .subscribe((resultData: any)=>
      {
        this.liste = resultData.result;
        
        console.log(resultData.result);
      });
    }

    //selection de categorie pour le code
  getCategorie(){
    this.http.get("http://localhost:3000/select/categorie/")
    .subscribe((resultData: any)=>
    {
      this.listeCat = resultData.result;
      
      console.log(resultData.result);
    });
  }

}
