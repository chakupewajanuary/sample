import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';



bootstrapApplication(AppComponent,{
  providers: [
    provideAnimations(),
    ...appConfig.providers
  ]
}) 
  .catch((err) => console.error(err));
