import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/app/services/api.service";
import { Router, NavigationExtras } from "@angular/router";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-signin-microsoft',
  templateUrl: './signin-microsoft.component.html',
  styleUrls: ['./signin-microsoft.component.css']
})
export class SigninMicrosoftComponent implements OnInit {

  codeUser = ""
  constructor(private route: ActivatedRoute,private apiService: ApiService,  private router:Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe( q => {
      this.codeUser = q['code']
        this.apiService.getMicrosoftAuthCode(this.codeUser).subscribe(q => {
          var json_converter = JSON.stringify(q)
          var json_data = JSON.parse(json_converter).access_token
          this.apiService.getInfoUserMicrosoft(json_data).subscribe(info => {
            var json_user = {email:info['mail'], name:info['displayName']}
            localStorage.setItem('session', JSON.stringify(json_user));
            this.router.navigate(['/home'])
          })
        })
    })
  }
}
