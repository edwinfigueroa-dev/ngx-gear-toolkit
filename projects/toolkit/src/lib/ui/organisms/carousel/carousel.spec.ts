import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCarouselComponent } from './carousel';

describe('UiCarouselComponent', () => {
  let component: UiCarouselComponent;
  let fixture: ComponentFixture<UiCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiCarouselComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
