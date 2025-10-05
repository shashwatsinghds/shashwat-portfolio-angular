import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { environment } from '../../../environments/environment';

interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

interface Week {
  contributionDays: ContributionDay[];
}

interface ContributionCalendar {
  totalContributions: number;
  weeks: Week[];
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
      const calendar = await this.fetchContributions(this.username, this.token);
      console.log('Calendar data received:', calendar);
      this.renderHeatmap(calendar);
    } catch (error) {
      console.error('Error loading GitHub contributions:', error);
      this.showError('Failed to load GitHub contributions. Check console for details.');
    }
  }

  private async fetchContributions(username: string, token: string): Promise<ContributionCalendar> {
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
                }
              }
            }
          }
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
    return json.data.user.contributionsCollection.contributionCalendar;
  }

  private renderHeatmap(calendar: ContributionCalendar) {
    console.log('Rendering heatmap with calendar:', calendar);
    
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

    container.innerHTML = "";
    container.appendChild(svg);

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
      <div class="stats-grid" style="display: flex; justify-content: space-between; align-items: center; gap: 30px; margin-bottom: 15px; flex-direction: row; width: 100%;">
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
}
