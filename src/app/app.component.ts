import { CommonModule } from '@angular/common';
import { Comment } from '@angular/compiler';
import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
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

  //show content only in the home page
  showHomeContent = true;
 

  showDropdown = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  onLogoff() {
    // Add your logoff logic here
    this.showDropdown = false; // Close the dropdown after logoff
    console.log("User logged off");
    this.router.navigateByUrl('');
    
  }
  // constructor
  constructor(private router: Router,private el:ElementRef){
      // Listen for route changes
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          // Update showHomeContent based on the route
          this.showHomeContent = event.url === '/' || event.url === '/';
        }
      });
  }

  // Detect clicks outside the dropdown
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const clickedInside = this.el.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.showDropdown = false;
    }
  }


}
