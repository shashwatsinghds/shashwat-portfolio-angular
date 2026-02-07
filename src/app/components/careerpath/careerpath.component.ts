import { Component, OnInit, AfterViewInit, HostListener, ElementRef, QueryList, ViewChildren } from '@angular/core';
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
  private revealedSet = new Set<number>();

  constructor(private timelineService: TimelineService) {}

  ngOnInit(): void {
    this.timelineItems = this.timelineService.getTimelineItems();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateProgress();
      this.revealItems();
    }, 200);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.updateProgress();
    this.revealItems();
  }

  /** Animate the progress line height based on scroll position */
  private updateProgress(): void {
    const timeline = document.querySelector('.timeline') as HTMLElement;
    const progressBar = document.querySelector('.timeline-progress') as HTMLElement;
    if (!timeline || !progressBar) return;

    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const scrolled = Math.min(Math.max(windowHeight - rect.top, 0), rect.height);
    progressBar.style.height = `${scrolled}px`;
  }

  /** One-shot reveal: once an item is revealed it stays visible */
  private revealItems(): void {
    const items = document.querySelectorAll('.timeline-item');
    const windowHeight = window.innerHeight;

    items.forEach((item, index) => {
      if (this.revealedSet.has(index)) return; // already revealed, skip
      const rect = item.getBoundingClientRect();
      if (rect.top < windowHeight * 0.82) {
        this.revealedSet.add(index);
        // Stagger: delay each item slightly after the previous one
        const delay = index * 100;
        setTimeout(() => {
          item.classList.add('active');
        }, delay);
      }
    });
  }

  onImageError(event: any): void {
    event.target.src = 'https://via.placeholder.com/80x80/818cf8/ffffff?text=IMG';
  }
}
