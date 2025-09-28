import { Component, OnInit } from '@angular/core';
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
export class CareerPathComponent implements OnInit {
  timelineItems: TimelineItem[] = [];

  constructor(private timelineService: TimelineService) {}

  ngOnInit(): void {
    this.timelineItems = this.timelineService.getTimelineItems();
  }
}