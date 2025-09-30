import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private navbarHeight = 60; // Adjust based on your navbar height

  constructor(private router: Router) {}

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const extraOffset = 20;
      const offsetPosition = elementPosition + window.pageYOffset - (this.navbarHeight-extraOffset);
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
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