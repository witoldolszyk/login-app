import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgbModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'login-app';
}
