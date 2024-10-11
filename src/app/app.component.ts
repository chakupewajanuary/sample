import { CommonModule } from '@angular/common';
import { Comment } from '@angular/compiler';
import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenubarComponent } from './components/menubar/menubar.component';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'sample';

  // for the footer to display exactly date
  currentDatetime: Date =new Date();
  currentYear:number=this.currentDatetime.getFullYear();
  private timeSubscription : Subscription | undefined

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
  //livecycel method for reloading (loading ) on the page
  ngOnInit(): void {
     // Update time every second
     this.timeSubscription = interval(1000).subscribe(() => {
      this.currentDatetime = new Date();
      this.currentYear = this.currentDatetime.getFullYear();
    });
  }

  
  ngOnDestroy() {
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe();
    }
  }


}
