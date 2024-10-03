import { CommonModule } from '@angular/common';
import { Comment } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenubarComponent } from './components/menubar/menubar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sample';

}
