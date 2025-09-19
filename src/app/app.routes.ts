import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { CareerpathComponent } from './components/careerpath/careerpath.component';
import { ContactComponent } from './components/contact/contact.component';
import { DownloadsComponent } from './components/downloads/downloads.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'career-path', component: CareerpathComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'downloads', component: DownloadsComponent },
  { path: '**', redirectTo: '/home' } // Wildcard route for 404
];