import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) { }
  loggedIn: boolean = false;

  ngOnInit(): void {

  }

  logInSystem() {
    this.router.navigate(['/login'])
  }
}
