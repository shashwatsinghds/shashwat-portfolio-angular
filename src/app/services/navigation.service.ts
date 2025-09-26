import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private navbarHeight = 60; // Adjust based on your navbar height

  constructor(private router: Router) {}

  scrollToSection(sectionId: string): void {
    // First navigate to the route
    this.router.navigate([`/${sectionId}`]);
    
    // Then scroll to the section with offset for navbar
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - this.navbarHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  }

  getActiveSection(): string {
    const sections = ['home', 'about', 'portfolio', 'career-path', 'contact', 'downloads'];
    let currentSection = 'home';

    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= this.navbarHeight && rect.bottom > this.navbarHeight) {
          currentSection = section;
        }
      }
    });

    return currentSection;
  }
}