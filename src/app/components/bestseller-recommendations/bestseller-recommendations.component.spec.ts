import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestsellerRecommendationsComponent } from './bestseller-recommendations.component';

describe('BestsellerRecommendationsComponent', () => {
  let component: BestsellerRecommendationsComponent;
  let fixture: ComponentFixture<BestsellerRecommendationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestsellerRecommendationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BestsellerRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
