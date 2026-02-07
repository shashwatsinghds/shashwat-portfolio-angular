import { Component, AfterViewInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  constructor(private navigationService: NavigationService) {}

  ngAfterViewInit() {
    const nameTyped = new Typed('.name-title', {
      strings: ['Hi, I\'m Shashwat Singh'],
      typeSpeed: 70,
      showCursor: true,
      cursorChar: '|',
      onComplete: () => {
        setTimeout(() => {
          const cursor = document.querySelector('.typed-cursor');
          if (cursor) {
            cursor.remove();
          }

          new Typed('.role-title', {
            strings: ['Software Engineer 2 | GenAI | RAG with LLMs'],
            typeSpeed: 50,
            backDelay: 100,
            showCursor: false
          });
        }, 1000);
      }
    });
  }

  scrollToPortfolio(): void {
    this.navigationService.scrollToSection('portfolio');
  }
}
