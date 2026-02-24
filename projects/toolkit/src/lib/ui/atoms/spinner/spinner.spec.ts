import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiSpinnerComponent } from './spinner';

describe('UiSpinnerComponent', () => {
  let component: UiSpinnerComponent;
  let fixture: ComponentFixture<UiSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiSpinnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiSpinnerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
