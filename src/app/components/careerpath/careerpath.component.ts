import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineService } from '../../services/timeline.service';
import { TimelineItem } from '../../models/timeline-item.model';

@Component({
  selector: 'app-career-path',
  templateUrl: './careerpath.component.html',
  styleUrls: ['./careerpath.component.scss'],
  imports: [CommonModule],
  standalone: true
})
export class CareerPathComponent implements OnInit, AfterViewInit {
  timelineItems: TimelineItem[] = [];

  constructor(private timelineService: TimelineService) {}

  ngOnInit(): void {
    this.timelineItems = this.timelineService.getTimelineItems();
    console.log('Timeline items loaded:', this.timelineItems);
  }

  ngAfterViewInit(): void {
    this.setupTimelineProgress();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    this.updateTimelineProgress();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.updateTimelineProgress();
  }

  private setupTimelineProgress(): void {
    // Initial setup
    setTimeout(() => {
      this.updateTimelineProgress();
    }, 100);
  }

  private updateTimelineProgress(): void {
    const timeline = document.querySelector('.timeline');
    const progressBar = document.querySelector('.timeline-progress');
    
    if (!timeline || !progressBar) return;

    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const start = rect.top;
    const end = rect.bottom;

    // Calculate how far through the timeline we've scrolled
    const scrollPosition = Math.min(Math.max(windowHeight - start, 0), rect.height);
    const progress = (scrollPosition / rect.height) * 100;
    
    

    // Update active timeline items
    this.updateActiveTimelineItems();
  }

  private updateActiveTimelineItems(): void {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item: Element) => {
      const rect = item.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top < windowHeight * 0.75 && rect.bottom > 0) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  onImageError(event: any): void {
    console.log('Image failed to load:', event.target.src);
    // Set a fallback image
    event.target.src = 'https://via.placeholder.com/80x80/00aaff/ffffff?text=IMG';
  }
}