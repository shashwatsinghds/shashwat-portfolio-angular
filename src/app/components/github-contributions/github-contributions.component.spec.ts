import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubContributionsComponent } from './github-contributions.component';

describe('GithubContributionsComponent', () => {
  let component: GithubContributionsComponent;
  let fixture: ComponentFixture<GithubContributionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GithubContributionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GithubContributionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
