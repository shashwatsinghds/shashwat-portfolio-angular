import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { environment } from '../../../environments/environment';

interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
  weekday: number;
}

interface Week {
  contributionDays: ContributionDay[];
}

interface Repository {
  name: string;
  owner: { login: string };
  url: string;
  stargazerCount: number;
  primaryLanguage: { name: string } | null;
}

interface RepositoryContribution {
  repository: Repository;
  contributions: { totalCount: number };
}

interface ContributionCalendar {
  totalContributions: number;
  weeks: Week[];
  totalCommitContributions: number;
  totalIssueContributions: number;
  totalPullRequestContributions: number;
  totalPullRequestReviewContributions: number;
  totalRepositoryContributions: number;
  totalRepositoriesWithContributedCommits: number;
  totalRepositoriesWithContributedIssues: number;
  totalRepositoriesWithContributedPullRequests: number;
  totalRepositoriesWithContributedPullRequestReviews: number;
  commitContributionsByRepository: RepositoryContribution[];
}

interface UserProfile {
  login: string;
  name: string;
  bio: string;
  avatarUrl: string;
  location: string;
  websiteUrl: string;
  company: string;
  followers: { totalCount: number };
  following: { totalCount: number };
  repositories: { totalCount: number };
  starredRepositories: { totalCount: number };
  createdAt: string;
}

interface GitHubData {
  contributionsCollection: {
    contributionCalendar: ContributionCalendar;
    totalCommitContributions: number;
    totalIssueContributions: number;
    totalPullRequestContributions: number;
    totalPullRequestReviewContributions: number;
    totalRepositoryContributions: number;
    totalRepositoriesWithContributedCommits: number;
    totalRepositoriesWithContributedIssues: number;
    totalRepositoriesWithContributedPullRequests: number;
    totalRepositoriesWithContributedPullRequestReviews: number;
    commitContributionsByRepository: RepositoryContribution[];
  };
  login: string;
  name: string;
  bio: string;
  avatarUrl: string;
  location: string;
  websiteUrl: string;
  company: string;
  followers: { totalCount: number };
  following: { totalCount: number };
  repositories: { totalCount: number };
  starredRepositories: { totalCount: number };
  createdAt: string;
}

@Component({
  selector: 'app-github-contributions',
  imports: [],
  templateUrl: './github-contributions.component.html',
  styleUrl: './github-contributions.component.scss'
})
export class GithubContributionsComponent implements OnInit, AfterViewInit {
  @ViewChild('ghcal', { static: false }) ghcalRef!: ElementRef;

  private readonly username = environment.github.username;
  private readonly token = environment.github.token;

  ngOnInit() {
    console.log('GitHub Contributions Component initialized');
    // Make refresh method available globally for debugging
    (window as any).refreshGitHubContributions = () => this.refreshContributions();
  }

  ngAfterViewInit() {
    console.log('View initialized, loading contributions...');
    // Add a small delay to ensure DOM is fully ready
    setTimeout(() => {
      this.loadContributions();
    }, 100);
  }

  async loadContributions() {
    try {
      console.log('Loading GitHub contributions...');
      const userData = await this.fetchContributions(this.username, this.token);
      console.log('GitHub data received:', userData);
      
      // Extract the calendar and user data correctly
      const calendar = userData.contributionsCollection?.contributionCalendar;
      const user = {
        login: userData.login,
        name: userData.name,
        bio: userData.bio,
        avatarUrl: userData.avatarUrl,
        location: userData.location,
        websiteUrl: userData.websiteUrl,
        company: userData.company,
        followers: userData.followers,
        following: userData.following,
        repositories: userData.repositories,
        starredRepositories: userData.starredRepositories,
        createdAt: userData.createdAt
      };
      
      this.renderHeatmap(calendar, user, userData.contributionsCollection);
    } catch (error) {
      console.error('Error loading GitHub contributions:', error);
      this.showError('Failed to load GitHub contributions. Check console for details.');
    }
  }

  private async fetchContributions(username: string, token: string): Promise<GitHubData> {
    const query = `
      query($login: String!) {
        user(login: $login) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                  color
                  weekday
                }
              }
            }
            totalCommitContributions
            totalIssueContributions
            totalPullRequestContributions
            totalPullRequestReviewContributions
            totalRepositoryContributions
            totalRepositoriesWithContributedCommits
            totalRepositoriesWithContributedIssues
            totalRepositoriesWithContributedPullRequests
            totalRepositoriesWithContributedPullRequestReviews
            commitContributionsByRepository(maxRepositories: 5) {
              repository {
                name
                owner { login }
                url
                stargazerCount
                primaryLanguage { name }
              }
              contributions { totalCount }
            }
          }
          login
          name
          bio
          avatarUrl
          location
          websiteUrl
          company
          followers { totalCount }
          following { totalCount }
          repositories { totalCount }
          starredRepositories { totalCount }
          createdAt
        }
      }
    `;

    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({ query, variables: { login: username } })
    });

    const json = await res.json();
    console.log('Full API response:', json);

    if (json.errors) {
      console.error('GitHub API errors:', json.errors);
      throw new Error(`GitHub API Error: ${json.errors[0].message}`);
    }

    if (!json.data || !json.data.user) {
      throw new Error('No user data received from GitHub API');
    }
    
    // Log the structure to understand what we're getting
    console.log('User data structure:', json.data.user);
    console.log('Contributions collection:', json.data.user.contributionsCollection);
    
    return json.data.user;
  }

  private renderHeatmap(calendar: ContributionCalendar, user: UserProfile, contributionsCollection: any) {
    console.log('Rendering heatmap with calendar:', calendar);
    console.log('User profile:', user);
    
    // Validate calendar data
    if (!calendar || !calendar.weeks) {
      console.error('Invalid calendar data:', calendar);
      this.showError('Invalid contribution data received from GitHub');
      return;
    }
    
    // Check if content already exists to prevent re-rendering
    const existingWrapper = document.getElementById('github-contributions-wrapper');
    if (existingWrapper) {
      console.log('GitHub contributions already rendered, skipping...');
      return;
    }
    
    // Try ViewChild first, then fallback to getElementById
    let container: HTMLElement | null = null;
    if (this.ghcalRef && this.ghcalRef.nativeElement) {
      container = this.ghcalRef.nativeElement;
      console.log('Using ViewChild container');
    } else {
      container = document.getElementById('ghcal');
      console.log('Using getElementById container:', container);
    }
    
    if (!container) {
      console.error('Container element not found');
      return;
    }
    
    const cellSize = 20;
    const cellGap = 4;
    const weeks = calendar.weeks;
    
    if (!weeks || weeks.length === 0) {
      console.error('No weeks data available');
      this.showError('No contribution data available for this period');
      return;
    }

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", (weeks.length * (cellSize + cellGap)).toString());
    svg.setAttribute("height", (7 * (cellSize + cellGap)).toString());

    weeks.forEach((week, weekIndex) => {
      week.contributionDays.forEach((day, dayIndex) => {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", (weekIndex * (cellSize + cellGap)).toString());
        rect.setAttribute("y", (dayIndex * (cellSize + cellGap)).toString());
        rect.setAttribute("width", cellSize.toString());
        rect.setAttribute("height", cellSize.toString());
        rect.setAttribute("fill", day.color || "#eee");
        rect.setAttribute("data-date", day.date);
        rect.setAttribute("data-count", day.contributionCount.toString());

        // Simple tooltip using title attribute as fallback
        // Fix timezone issue by parsing the date correctly
        const parseDate = (dateString: string) => {
          // GitHub returns dates in YYYY-MM-DD format
          // Add time component to avoid timezone issues
          const date = new Date(dateString + 'T12:00:00');
          return date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          });
        };
        
        const formattedDate = parseDate(day.date);
        
        rect.setAttribute('title', `📅 ${formattedDate}\n💻 ${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""}\nClick to view on GitHub`);

        // Enhanced tooltip on hover with detailed info
        rect.addEventListener("mouseenter", (e) => {
          // Remove any existing tooltip
          const existingTooltip = document.getElementById("gh-tooltip");
          if (existingTooltip) {
            existingTooltip.remove();
          }
          
          // Create new tooltip
          const tooltip = document.createElement("div");
          tooltip.id = "gh-tooltip";
          tooltip.style.cssText = `
            position: fixed;
            background: rgba(0, 0, 0, 0.95);
            color: #fff;
            padding: 15px 20px;
            border-radius: 10px;
            font-size: 14px;
            pointer-events: none;
            z-index: 999999;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
            border: 2px solid #00aaff;
            max-width: 300px;
            text-align: center;
            font-family: Arial, sans-serif;
            backdrop-filter: blur(10px);
            left: ${(e as MouseEvent).clientX + 15}px;
            top: ${(e as MouseEvent).clientY - 60}px;
          `;
          
          tooltip.innerHTML = `
            <div style="font-size: 16px; font-weight: bold; margin-bottom: 8px; color: #fff;">
              📅 ${formattedDate}
            </div>
            <div style="font-size: 20px; font-weight: bold; margin-bottom: 6px; color: #00aaff;">
              💻 ${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""}
            </div>
            <div style="font-size: 12px; color: #ccc; margin-top: 6px;">
              Click to view on GitHub
            </div>
          `;
          
          document.body.appendChild(tooltip);
        });
        
        rect.addEventListener("mouseleave", () => {
          const tooltip = document.getElementById("gh-tooltip");
          if (tooltip) {
            tooltip.remove();
          }
        });

        // Click event to open GitHub
        rect.addEventListener("click", (e) => {
          const githubUrl = `https://github.com/${this.username}?tab=overview&from=${day.date}`;
          window.open(githubUrl, '_blank');
        });

        svg.appendChild(rect);
      });
    });

    // Clear existing content but preserve structure
    container.innerHTML = "";
    
    // Add a wrapper div to protect the content from being overwritten
    const wrapper = document.createElement("div");
    wrapper.id = "github-contributions-wrapper";
    wrapper.style.cssText = "width: 100%; height: 100%; position: relative;";
    
    wrapper.appendChild(svg);
    container.appendChild(wrapper);

    // Stats
    let currentStreak = 0, longestStreak = 0, temp = 0;
    weeks.flatMap(w => w.contributionDays).forEach(d => {
      if (d.contributionCount > 0) {
        temp++;
        if (temp > longestStreak) longestStreak = temp;
        currentStreak = temp;
      } else {
        temp = 0;
      }
    });

    const stats = document.createElement("div");
    stats.className = "contribution-stats";
    stats.innerHTML = `
      <!-- Main Stats Row -->
      <div class="stats-grid" style="display: flex; justify-content: space-between; align-items: center; gap: 20px; margin-bottom: 20px; flex-direction: row; width: 100%;">
        <div class="stat-item" style="flex: 1; text-align: center; padding: 0; background: transparent; border: none; min-width: 120px; max-width: 200px; display: flex; flex-direction: column; justify-content: center; transition: all 0.3s ease;">
          <span class="stat-number" style="color: #00aaff; font-size: 32px; font-weight: bold; margin-bottom: 8px; display: block; text-shadow: 0 0 10px rgba(0,170,255,0.3);">${calendar.totalContributions}</span>
          <div class="stat-label" style="font-size: 14px; color: #ccc; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">Total Contributions</div>
        </div>
        <div class="stat-item" style="flex: 1; text-align: center; padding: 0; background: transparent; border: none; min-width: 120px; max-width: 200px; display: flex; flex-direction: column; justify-content: center; transition: all 0.3s ease;">
          <span class="stat-number" style="color: #28a745; font-size: 32px; font-weight: bold; margin-bottom: 8px; display: block; text-shadow: 0 0 10px rgba(40,167,69,0.3);">${longestStreak}</span>
          <div class="stat-label" style="font-size: 14px; color: #ccc; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">Longest Streak</div>
        </div>
        <div class="stat-item" style="flex: 1; text-align: center; padding: 0; background: transparent; border: none; min-width: 120px; max-width: 200px; display: flex; flex-direction: column; justify-content: center; transition: all 0.3s ease;">
          <span class="stat-number" style="color: #ffc107; font-size: 32px; font-weight: bold; margin-bottom: 8px; display: block; text-shadow: 0 0 10px rgba(255,193,7,0.3);">${currentStreak}</span>
          <div class="stat-label" style="font-size: 14px; color: #ccc; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">Current Streak</div>
        </div>
      </div>

      <!-- Detailed Stats Row -->
      <div class="stats-grid" style="display: flex; justify-content: space-between; align-items: center; gap: 15px; margin-bottom: 20px; flex-direction: row; width: 100%; flex-wrap: wrap;">
        <div class="stat-item" style="flex: 1; text-align: center; padding: 0; background: transparent; border: none; min-width: 100px; display: flex; flex-direction: column; justify-content: center; transition: all 0.3s ease;">
          <span class="stat-number" style="color: #e74c3c; font-size: 24px; font-weight: bold; margin-bottom: 4px; display: block; text-shadow: 0 0 8px rgba(231,76,60,0.3);">${contributionsCollection?.totalCommitContributions || 0}</span>
          <div class="stat-label" style="font-size: 12px; color: #ccc; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">Commits</div>
        </div>
        <div class="stat-item" style="flex: 1; text-align: center; padding: 0; background: transparent; border: none; min-width: 100px; display: flex; flex-direction: column; justify-content: center; transition: all 0.3s ease;">
          <span class="stat-number" style="color: #9b59b6; font-size: 24px; font-weight: bold; margin-bottom: 4px; display: block; text-shadow: 0 0 8px rgba(155,89,182,0.3);">${contributionsCollection?.totalPullRequestContributions || 0}</span>
          <div class="stat-label" style="font-size: 12px; color: #ccc; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">Pull Requests</div>
        </div>
        <div class="stat-item" style="flex: 1; text-align: center; padding: 0; background: transparent; border: none; min-width: 100px; display: flex; flex-direction: column; justify-content: center; transition: all 0.3s ease;">
          <span class="stat-number" style="color: #f39c12; font-size: 24px; font-weight: bold; margin-bottom: 4px; display: block; text-shadow: 0 0 8px rgba(243,156,18,0.3);">${contributionsCollection?.totalIssueContributions || 0}</span>
          <div class="stat-label" style="font-size: 12px; color: #ccc; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">Issues</div>
        </div>
        <div class="stat-item" style="flex: 1; text-align: center; padding: 0; background: transparent; border: none; min-width: 100px; display: flex; flex-direction: column; justify-content: center; transition: all 0.3s ease;">
          <span class="stat-number" style="color: #1abc9c; font-size: 24px; font-weight: bold; margin-bottom: 4px; display: block; text-shadow: 0 0 8px rgba(26,188,156,0.3);">${contributionsCollection?.totalRepositoriesWithContributedCommits || 0}</span>
          <div class="stat-label" style="font-size: 12px; color: #ccc; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">Repositories</div>
        </div>
      </div>

      <!-- Profile Info -->
      ${user ? `
      <div style="text-align: center; margin-bottom: 15px; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 10px; border: 1px solid rgba(255,255,255,0.1);">
        <div style="display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 10px;">
          <img src="${user.avatarUrl}" alt="${user.login}" style="width: 50px; height: 50px; border-radius: 50%; border: 2px solid #00aaff;">
          <div style="text-align: left;">
            <div style="font-size: 18px; font-weight: bold; color: #fff; margin-bottom: 4px;">${user.name || user.login}</div>
            <div style="font-size: 14px; color: #00aaff; margin-bottom: 2px;">@${user.login}</div>
            ${user.location ? `<div style="font-size: 12px; color: #ccc;">📍 ${user.location}</div>` : ''}
          </div>
        </div>
        ${user.bio ? `<div style="font-size: 14px; color: #ccc; margin-bottom: 10px; font-style: italic;">"${user.bio}"</div>` : ''}
        <div style="display: flex; justify-content: center; gap: 20px; font-size: 12px; color: #ccc;">
          <span>👥 ${user.followers?.totalCount || 0} followers</span>
          <span>⭐ ${user.starredRepositories?.totalCount || 0} stars</span>
          <span>📁 ${user.repositories?.totalCount || 0} repos</span>
        </div>
      </div>
      ` : ''}

      <div style="text-align: center;">
        <a href="https://github.com/${this.username}" target="_blank" style="color: #00aaff; text-decoration: none; font-weight: 500; font-size: 16px;">
          View Full Profile on GitHub →
        </a>
      </div>
    `;
    container.appendChild(stats);

    // Make SVG responsive
    requestAnimationFrame(() => {
      const svgElement = container.querySelector("svg");
      if (svgElement) {
        const w = svgElement.getAttribute("width");
        const h = svgElement.getAttribute("height");
        if (w && h) {
          svgElement.setAttribute("viewBox", `0 0 ${w} ${h}`);
          svgElement.removeAttribute("height");
          svgElement.setAttribute("width", "100%");
        }
      }
    });

    // Set up a MutationObserver to detect if content gets removed
    this.setupContentProtection(container);
  }

  private setupContentProtection(container: HTMLElement) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const wrapper = document.getElementById('github-contributions-wrapper');
          if (!wrapper && container.children.length === 0) {
            console.log('GitHub contributions content was removed, restoring...');
            // Restore the content after a short delay
            setTimeout(() => {
              this.refreshContributions();
            }, 100);
          }
        }
      });
    });

    observer.observe(container, {
      childList: true,
      subtree: true
    });
  }

  private showError(message: string) {
    // Try ViewChild first, then fallback to getElementById
    let container: HTMLElement | null = null;
    if (this.ghcalRef && this.ghcalRef.nativeElement) {
      container = this.ghcalRef.nativeElement;
    } else {
      container = document.getElementById('ghcal');
    }
    
    if (!container) {
      console.error('Container element not found for error display');
      return;
    }
    container.innerHTML = `<p style="color: red;">${message}</p>`;
  }

  // Public method to refresh the contributions if they disappear
  public refreshContributions() {
    console.log('Refreshing GitHub contributions...');
    const existingWrapper = document.getElementById('github-contributions-wrapper');
    if (existingWrapper) {
      existingWrapper.remove();
    }
    this.loadContributions();
  }

}
