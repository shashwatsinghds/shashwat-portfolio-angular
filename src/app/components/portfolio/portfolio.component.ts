import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.services';
import { Project } from '../../models/project.model';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  imports: [CommonModule, RouterLink, ScrollRevealDirective],
  standalone: true
})
export class PortfolioComponent implements OnInit {
  allProjects: Project[] = [];
  projects: Project[] = [];
  selectedProject: Project | null = null;
  currentSlideIndex = 0;
  isAutoPlaying = true;
  autoPlayInterval: any;
  activeFilter: 'all' | 'ml-ai' | 'software' | 'full-stack' = 'all';

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.allProjects = this.portfolioService.getProjects();
    this.projects = this.allProjects;
  }

  filterProjects(category: 'all' | 'ml-ai' | 'software' | 'full-stack'): void {
    this.activeFilter = category;
    if (category === 'all') {
      this.projects = this.allProjects;
    } else {
      this.projects = this.allProjects.filter(project => project.category === category);
    }
  }

  openModal(project: Project): void {
    this.selectedProject = project;
    this.currentSlideIndex = 0;
    this.startAutoPlay();
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.selectedProject = null;
    this.stopAutoPlay();
    document.body.style.overflow = '';
  }

  nextSlide(): void {
    if (this.selectedProject) {
      this.currentSlideIndex = (this.currentSlideIndex + 1) % this.selectedProject.slides.length;
    }
  }

  previousSlide(): void {
    if (this.selectedProject) {
      this.currentSlideIndex = this.currentSlideIndex === 0 
        ? this.selectedProject.slides.length - 1 
        : this.currentSlideIndex - 1;
    }
  }

  toggleAutoPlay(): void {
    if (this.isAutoPlaying) {
      this.stopAutoPlay();
    } else {
      this.startAutoPlay();
    }
  }

  goToSlide(index: number): void {
    if (this.selectedProject && index >= 0 && index < this.selectedProject.slides.length) {
      this.currentSlideIndex = index;
    }
  }

  private startAutoPlay(): void {
    this.stopAutoPlay();
    this.isAutoPlaying = true;
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  private stopAutoPlay(): void {
    this.isAutoPlaying = false;
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
}
