import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-share',
  templateUrl: './share.page.html',
  styleUrls: ['./share.page.scss'],
})
export class SharePage implements OnInit {

  private searchQuery: string = 'pizza';
  private appId: string = 'ae088893';
  private apiKey: string = 'd58abe14ee8a3c6d8a6ffb5bdf63ebef';
  public data: any;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get(`http://api.edamam.com/search?q=${this.searchQuery}&app_id=${this.appId}&app_key=${this.apiKey}`)
    .subscribe(async(res:any)=>{
      if(res){
        this.data = res.hits;
        console.log(await res);
      } else {
        console.log("error")
      }
    })
  }

}
