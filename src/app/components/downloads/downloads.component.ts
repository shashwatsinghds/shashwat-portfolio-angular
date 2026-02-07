import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss'],
  standalone: true,
  imports: [ScrollRevealDirective]
})
export class DownloadsComponent {
  constructor() {}
}
