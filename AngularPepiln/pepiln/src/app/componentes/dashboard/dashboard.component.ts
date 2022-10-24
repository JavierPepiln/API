import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  imagen = ""
  email = ""
  correoDashboard = "";
  session: any;
  codigo = new FormControl();
  message: boolean=false
  constructor(private router:Router, private activatedRoute: ActivatedRoute, private apiService: ApiService) {
    
   }

  ngOnInit(): void {

     let data:any = localStorage.getItem('session')
     this.session = data
     console.log(this.session)

     const img = this.apiService.getBarcodeByEmail(this.session).subscribe(data =>{console.log(this.imagen = data)});
     console.log(this.imagen)
  }

  async onSubmit() {
    this.apiService.getValidateCode(this.session, this.codigo.value).subscribe( ref => {
      if (ref == "true") {
        this.router.navigate(['/home'])
      } else {
        this.message = true
      }
    })
   
  }


}
