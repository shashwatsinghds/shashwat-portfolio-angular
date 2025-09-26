import { Injectable } from '@angular/core';
import { TimelineItem } from '../models/timeline-item.model';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  private timelineItems: TimelineItem[] = [
    {
      id: 'masters-graduation',
      title: 'Expected Graduation',
      subtitle: 'MS in Data Science',
      period: 'May, 2025',
      image: 'assets/files/Pictures/uofa.png',
      position: 'left'
    },
    {
      id: 'health-sciences',
      title: 'University Of Arizona, Health Sciences',
      subtitle: 'GenAI Application Developer',
      period: 'Jan 2025 - Present',
      image: 'assets/files/Pictures/uofa_healthsciences.png',
      position: 'right',
      imageClass: 'timeline-image-healthsciences'
    },
    {
      id: 'process-automation',
      title: 'University Of Arizona',
      subtitle: 'Process Automation Specialist',
      period: 'Sep 2023 - Jan 2025',
      image: 'assets/files/Pictures/uofa.png',
      position: 'left'
    },
    {
      id: 'masters-start',
      title: 'Joined Master\'s Program',
      subtitle: 'MS in Data Science',
      period: 'Fall 2023',
      image: 'assets/files/Pictures/uofa.png',
      position: 'right'
    },
    {
      id: 'infosys-senior',
      title: 'Infosys Ltd.',
      subtitle: 'Senior Systems Engineer',
      period: 'Sep 2022 - Jun 2024',
      image: 'assets/files/Pictures/infosys.png',
      position: 'left'
    },
    {
      id: 'infosys-systems',
      title: 'Infosys Ltd.',
      subtitle: 'Systems Engineer',
      period: 'Feb 2020 - Aug 2022',
      image: 'assets/files/Pictures/infosys.png',
      position: 'right'
    },
    {
      id: 'infosys-trainee',
      title: 'Infosys Ltd.',
      subtitle: 'Systems Engineer Trainee',
      period: 'September, 2019',
      image: 'assets/files/Pictures/infosys.png',
      position: 'left'
    },
    {
      id: 'ecell-lead',
      title: 'E-Cell, SATI Vidisha',
      subtitle: 'Technical Lead',
      period: '2017',
      image: 'assets/files/Pictures/ecell.png',
      position: 'right',
      imageClass: 'ecell-image'
    },
    {
      id: 'ecell-member',
      title: 'E-Cell, SATI Vidisha',
      subtitle: 'Executive Member',
      period: '2016',
      image: 'assets/files/Pictures/ecell.png',
      position: 'left',
      imageClass: 'ecell-image'
    },
    {
      id: 'sati-degree',
      title: 'SATI Vidisha',
      subtitle: 'BE in Computer Science',
      period: '2015 - 2019',
      image: 'assets/files/Pictures/sati.jpg',
      position: 'right'
    }
  ];

  getTimelineItems(): TimelineItem[] {
    return this.timelineItems;
  }
}