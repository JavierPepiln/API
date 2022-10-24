import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from "src/app/services/api.service";
import { Router, NavigationExtras } from "@angular/router";

@Component({
  selector: 'app-sigin-google',
  templateUrl: './sigin-google.component.html',
  styleUrls: ['./sigin-google.component.css']
})
export class SiginGoogleComponent implements OnInit {

  codeUser = ''
  constructor(private route: ActivatedRoute,private apiService: ApiService,  private router:Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.codeUser = params['code']
      this.apiService.getGoogleAuthCode("asd", this.codeUser, "738834903737-8mathhb9249cgo0u4piohikk42jko5ml.apps.googleusercontent.com", "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", "http://localhost:4200/signin-google")
      .subscribe(q => this.apiService.googleGetToken(q).subscribe(token => {
        var json_converter = JSON.stringify(token)
        var json_data = JSON.parse(json_converter).access_token
         this.apiService.getInfoGoogleUser(json_data).subscribe(info => {
          localStorage.setItem('session', JSON.stringify(info));
          this.router.navigate(['/home'])
         }) 
      }))     
    })
    
  }



}
