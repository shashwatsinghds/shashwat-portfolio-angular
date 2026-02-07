import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { CareerPathComponent } from './components/careerpath/careerpath.component';
import { ContactComponent } from './components/contact/contact.component';
import { GithubContributionsComponent } from './components/github-contributions/github-contributions.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'career-path', component: CareerPathComponent },
  { path: 'github-contributions', component: GithubContributionsComponent },
  { path: 'contact', component: ContactComponent },
  { 
    path: 'project/:id/demo', 
    loadComponent: () => import('./components/project-viewer/project-viewer.component').then(m => m.ProjectViewerComponent)
  },
  { path: '**', redirectTo: '/home' }
];
