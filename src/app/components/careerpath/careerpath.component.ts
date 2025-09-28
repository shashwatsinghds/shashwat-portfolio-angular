import { Component, OnInit } from '@angular/core';
import { TimelineService } from '../../services/timeline.service';
import { TimelineItem } from '../../models/timeline-item.model';

@Component({
  selector: 'app-career-path',
  templateUrl: './career-path.component.html',
  styleUrls: ['./career-path.component.scss'],
  standalone: true
})
export class CareerPathComponent implements OnInit {
  timelineItems: TimelineItem[] = [];

  constructor(private timelineService: TimelineService) {}

  ngOnInit(): void {
    this.timelineItems = this.timelineService.getTimelineItems();
  }
}