import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: true
})
export class ContactComponent {
  showNotification = false;

  copyEmail(email: string): void {
    navigator.clipboard.writeText(email).then(() => {
      this.showNotification = true;
      setTimeout(() => {
        this.showNotification = false;
      }, 2000);
    });
  }
}