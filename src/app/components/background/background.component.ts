import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { BackgroundService } from '../../services/background.service';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
  standalone: true
})
export class BackgroundComponent implements AfterViewInit {
  @ViewChild('backgroundCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  constructor(private backgroundService: BackgroundService) {}

  ngAfterViewInit(): void {
    this.backgroundService.initializeBackground(this.canvas.nativeElement);
  }
}