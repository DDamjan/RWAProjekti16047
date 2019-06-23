import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'driver-register',
  templateUrl: './driver-register.component.html',
  styleUrls: ['./driver-register.component.css']
})
export class DriverRegisterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  btnCancel(){
    this.router.navigateByUrl('/');
  }

}
