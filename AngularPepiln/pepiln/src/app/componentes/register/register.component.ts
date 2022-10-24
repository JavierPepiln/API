import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from "@angular/forms";
import { CredentialsService } from 'src/app/services/credentials.service';
import { ApiService } from "src/app/services/api.service";
import { Router, NavigationExtras } from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formulario: FormGroup;
  
  /*name = new FormControl()
  pass = new FormControl()*/
  

  constructor(private credentialsService : CredentialsService, private apiService: ApiService, private router:Router) { 
    this.formulario = new FormGroup({
      email: new FormControl(),
      pass: new FormControl()
    })
  }

  ngOnInit(): void {

  }

  async onSubmit() {
    
    var save = "";

    const password = this.formulario.get('pass')?.value
    const encryptPass = await this.apiService.getEncryptPass(password) 

    encryptPass.subscribe(ref => {
      const response = this.credentialsService.addNewUser({"id":String(this.formulario.get('email')?.value),"email":String(this.formulario.get('email')?.value),"password":String(ref)});
      this.router.navigate(['/login'])
    })
  }

  googleAuth() {
  return window.location.href = "https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&access_type=offline&include_granted_scopes=true&response_type=code&redirect_uri=http://localhost:4200/signin-google&client_id=738834903737-8mathhb9249cgo0u4piohikk42jko5ml.apps.googleusercontent.com"
  
  }

}
