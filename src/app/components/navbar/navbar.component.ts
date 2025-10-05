import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class NavbarComponent implements OnInit {
  activeSection = 'home';

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    // Listen for scroll events to update active section
    window.addEventListener('scroll', () => {
      this.activeSection = this.navigationService.getActiveSection();
    });
  }

  navigateToSection(section: string): void {
    this.navigationService.scrollToSection(section);
    this.activeSection = section;
    
    // Trigger GitHub contributions refresh when that section is clicked
    if (section === 'github-contributions') {
      this.refreshGitHubContributions();
    }
  }

  private refreshGitHubContributions(): void {
    // Dispatch a custom event to trigger refresh
    const refreshEvent = new CustomEvent('refreshGitHubContributions');
    window.dispatchEvent(refreshEvent);
  }
}