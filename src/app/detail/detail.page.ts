import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { IProduit } from '../produit/produit';
import { IDetail } from './detail';
import { env } from '../variable';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  private url = this.env.URL_SERVER; //'http://localhost:3000' 
  public nbrPerson:number = 0;
  public qteProduit:number = 0;
  public id_recette:number = 0;
  public varProduit:string = '';
  public nom_recette:string = '';
  public err:string = '';
  public liste:IDetail[]=[];
  public listePro:IProduit[]=[];
  public produit:string = '';
  public image:string = 'assets/card-media.png';
  public description_recette:string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private env: env,
    private camera: Camera
    ) { }

  ngOnInit() {

    this.id_recette = this.route.snapshot.params['id_recette'];

    this.route.queryParams.subscribe(params => {
      this.nbrPerson = params['person'];
    });
    console.log(this.nbrPerson + " r= " + this.id_recette);

    this.getPlat();
    this.getAllProduit();
    this.getProduit();
    this.description_();
  }

  //get plat where id=id_recette
  getPlat(){
    this.http.get(`${this.url}/select/plat/${this.id_recette}`)
    .subscribe((resultData: any)=>
    {
      this.nom_recette = resultData.result[0].nom_plat;
      console.log(this.nom_recette);
    });
  }

  //get all produit where id=id_recette for list
  async getAllProduit(){

    const loading = await this.loadingCtrl.create({
      message:'Chargement ...',
    });
    loading.present();

    this.http.get(`${this.url}/select/detail/${this.id_recette}`)
    .subscribe((resultData: any)=>
    {
      this.liste = resultData.result;
      loading.dismiss();
      console.log(this.liste);
    });
  }

  //get all produit for <select> </select>
  getProduit(){
    this.http.get(`${this.url}/select/produit/`)
    .subscribe((resultData: any)=>
    {
      this.listePro = resultData.result;
      console.log(this.listePro);
    });
  }

  //click sur btnAjout
  btnAjout(){
    if(this.qteProduit>0&&this.produit!=''){
      let newValue = {
        "id_plat":this.id_recette,
        "libellePro" : this.produit,
        "variete" : this.varProduit,
        "qte" : this.qteProduit,
      }
      // console.log(this.produit,this.qteProduit,this.varProduit);
      this.addProduit(newValue);
      this.produit="";
      this.varProduit="";
      this.qteProduit=0;
    }else{
      this.err="Champs vide non valide.";
    }
  }

  //add new produit
  addProduit(bodyData:{}){
    this.http.post(`${this.url}/plat/add/produit`,bodyData).subscribe((resultData: any)=>
      {
          console.log(resultData,"produit Successfully");
      });
      this.getAllProduit();
      this.getAllProduit();
  }

  //supression d'un produit
  btnSup(id:number){
    this.presentAlert(id);
  }

  //show alert avant suprimer
  async presentAlert(id:number) {
    const alert = await this.alertController.create({
      message: 'voullez-vous vraiment la suprimer?',
      buttons: [
        {
          text: 'Annuler',
          role: 'Annuler',
        },
        {
          text: 'Suprimer',
          role: 'Suprimer',
        },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    if(role=='Suprimer'){
      this.http.delete(`${this.url}/delete/detail/`+ id).subscribe((resultData: any)=>
    {
        console.log(resultData,"produit Deleted");
        this.getAllProduit();
    });
      console.log(role);
    }

  }

  //takePhoto

  takePhoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     console.log('succes',base64Image);
     this.image = imageData;
     this.uploadFile(imageData);
    }, (err) => {
     // Handle error
     console.log('error');
    });
  }

  choosePhoto(){
    const optionsGallery: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      quality: 100,
      allowEdit: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(optionsGallery).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     console.log('succes',base64Image);
     this.image = imageData;
     this.uploadFile(imageData);
    }, (err) => {
     // Handle error
     console.log('error');
    });
  }

  //mangala description-ny recette any @db
  description_(){
    //description
    this.http.get(`${this.url}/description/${this.id_recette}`)
    .subscribe((resultData: any)=>
    {
      console.log(resultData.result[0]);
      if(resultData.result[0]){
        this.image = resultData.result[0].img?this.url+'/'+resultData.result[0].img:'./assets/card-media.png';
        this.description_recette= resultData.result[0].description?resultData.result[0].description:'(No description)';
      }else{
        this.image = './assets/card-media.png';
        this.description_recette = '(No description)';
      }
    });
  }

  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
  
    const response = await this.http.post(this.url+'/upload-file', formData).subscribe((resultData: any)=>
    {
        console.log(resultData);
    });
  }

}