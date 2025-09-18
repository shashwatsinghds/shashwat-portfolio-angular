import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private projects: Project[] = [
    // We'll populate this with your project data
  ];

  getProjects(): Project[] {
    return this.projects;
  }

  getProjectById(id: string): Project | undefined {
    return this.projects.find(project => project.id === id);
  }
}