import { Component, OnInit } from '@angular/core';
import { UserUtil } from 'src/app/utils/user.util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  signout() {
    UserUtil.clear();
    this.router.navigate(["/login"]);
  }
}
