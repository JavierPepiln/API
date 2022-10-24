import { Component, OnInit } from '@angular/core';
import { CredentialsService } from 'src/app/services/credentials.service';
import { ApiService } from "src/app/services/api.service";
import { FormGroup } from '@angular/forms';
import { FormControl } from "@angular/forms";
import { Router, NavigationExtras } from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  formulario: FormGroup;
  correo = "";

  constructor(private apiService: ApiService, private credentialsService : CredentialsService, private router:Router) {
    this.formulario = new FormGroup({
      email: new FormControl(),
      pass: new FormControl()
    })
   }

  ngOnInit(): void {

  }

  async onSubmit() {

    
    await this.credentialsService.getUser().subscribe(ref => {
      const correo = ref.filter( data => {
      return data.id === this.formulario.get('email')?.value
      }) 
      this.correo = correo[0]["password"]
      this.apiService.getValidatePass(this.formulario.get('pass')?.value, this.correo).subscribe( ref => {
          if (ref == "true") {
              localStorage.setItem('session', this.formulario.get('email')?.value);
              let navigationExtra:NavigationExtras = {
                state:{correo:this.correo}       
              }
              this.router.navigate(['/dashboard'], navigationExtra)
          } else {
            
          }
       })
   })
  }

  googleAuth() {
    var url = this.apiService.getSocialAccount('google', '738834903737-8mathhb9249cgo0u4piohikk42jko5ml.apps.googleusercontent.com', 'http://localhost:4200/signin-google').subscribe(q => {
      return window.location.href = q
    })
    // return window.location.href = "https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&access_type=offline&include_granted_scopes=true&response_type=code&redirect_uri=http://localhost:4200/signin-google&client_id=738834903737-8mathhb9249cgo0u4piohikk42jko5ml.apps.googleusercontent.com"
    }

  microsoftAuth(){
    // var url = this.apiService.getSocialAccount('microsoft', '6602f94a-3574-4b4e-b53b-fb91200de84b', 'http://localhost:4200/signin-microsoft').subscribe(q => {
    //   return window.location.href = q
    // })

      var url = this.apiService.spaMicrosoftAuth('6602f94a-3574-4b4e-b53b-fb91200de84b', 'http://localhost:4200/signin-microsoft').subscribe(q => {
      return window.location.href = q
    })
    

  }

}
