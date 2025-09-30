import { Component, AfterViewInit } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  ngAfterViewInit() {
    // Step 1: Type the name with cursor
    const nameTyped = new Typed('.name-title', {
      strings: ['Shashwat Singh'],
      typeSpeed: 70,
      showCursor: true,
      cursorChar: '|',
      onComplete: () => {
        // Step 2: Let cursor blink for ~1 second (2 blinks)
        setTimeout(() => {
          // Step 3: Remove cursor manually
          const cursor = document.querySelector('.typed-cursor');
          if (cursor) {
            cursor.remove();
          }

          // Step 4: Start roles animation without cursor
          new Typed('.role-title', {
            strings: ['Software Engineer 2', 'Data Scientist', 'Machine Learning', 'GenAI'],
            typeSpeed: 50,
            backSpeed: 40,
            backDelay: 100,
            loop: true,
            showCursor: false // no cursor here
          });
        }, 1000); // adjust timing (1000ms = ~2 blinks)
      }
    });
  }
}
