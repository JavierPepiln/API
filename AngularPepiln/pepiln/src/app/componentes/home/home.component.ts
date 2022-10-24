import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  imagen = ""
  username = ""
  email = ""
  constructor() { }

  ngOnInit(): void {
    let data:any = localStorage.getItem('session')
    var json_data = JSON.parse(data)
    this.imagen = json_data.picture
    this.username = json_data.name
    this.email = json_data.email
    console.log(json_data)
  }

}
