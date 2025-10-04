import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { CareerPathComponent } from './components/careerpath/careerpath.component';
import { ContactComponent } from './components/contact/contact.component';
import { DownloadsComponent } from './components/downloads/downloads.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BackgroundComponent } from './components/background/background.component';
import { GithubContributionsComponent } from './components/github-contributions/github-contributions.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterOutlet, 
    HomeComponent, 
    AboutComponent, 
    PortfolioComponent, 
    CareerPathComponent, 
    ContactComponent, 
    DownloadsComponent,
    NavbarComponent, 
    BackgroundComponent,
    GithubContributionsComponent
  ],
  standalone: true
})
export class AppComponent {
  title = 'Shashwat Singh - Portfolio';
}