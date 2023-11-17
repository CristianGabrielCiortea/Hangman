import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  iconImage = 'assets/images/icon/icon.png';
  constructor(private router: Router) {}

  play() {
    this.router.navigate(['/game']);
  }
}
