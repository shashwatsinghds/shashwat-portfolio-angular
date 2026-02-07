import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PortfolioService } from '../../services/portfolio.services';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-viewer',
  templateUrl: './project-viewer.component.html',
  styleUrls: ['./project-viewer.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ProjectViewerComponent implements OnInit, OnDestroy {
  project: Project | null = null;
  safeUrl: SafeResourceUrl | null = null;
  isLoading = true;
  loadError = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private portfolioService: PortfolioService
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      const found = this.portfolioService.getProjectById(projectId);
      if (found && found.liveUrl) {
        this.project = found;
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(found.liveUrl);
      } else {
        this.goBack();
      }
    } else {
      this.goBack();
    }

    // Prevent body scroll while viewer is open
    document.body.style.overflow = 'hidden';
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  onIframeLoad(): void {
    this.isLoading = false;
  }

  onIframeError(): void {
    this.isLoading = false;
    this.loadError = true;
  }

  openExternal(): void {
    if (this.project?.liveUrl) {
      window.open(this.project.liveUrl, '_blank');
    }
  }

  goBack(): void {
    this.router.navigate(['/'], { fragment: 'portfolio' });
  }
}
