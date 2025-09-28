import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.services';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  imports: [CommonModule],
  standalone: true
})
export class PortfolioComponent implements OnInit {
  projects: Project[] = [];
  selectedProject: Project | null = null;
  currentSlideIndex = 0;
  isAutoPlaying = true;
  autoPlayInterval: any;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.projects = this.portfolioService.getProjects();
  }

  openModal(project: Project): void {
    this.selectedProject = project;
    this.currentSlideIndex = 0;
    this.startAutoPlay();
  }

  closeModal(): void {
    this.selectedProject = null;
    this.stopAutoPlay();
  }

  nextSlide(): void {
    if (this.selectedProject) {
      this.currentSlideIndex = (this.currentSlideIndex + 1) % this.selectedProject.slides.length;
      this.stopAutoPlay();
    }
  }

  previousSlide(): void {
    if (this.selectedProject) {
      this.currentSlideIndex = this.currentSlideIndex === 0 
        ? this.selectedProject.slides.length - 1 
        : this.currentSlideIndex - 1;
      this.stopAutoPlay();
    }
  }

  toggleAutoPlay(): void {
    if (this.isAutoPlaying) {
      this.stopAutoPlay();
    } else {
      this.startAutoPlay();
    }
  }

  private startAutoPlay(): void {
    this.isAutoPlaying = true;
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  private stopAutoPlay(): void {
    this.isAutoPlaying = false;
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }
}