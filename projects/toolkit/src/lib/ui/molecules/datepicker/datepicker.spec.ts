import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiDatepickerComponent } from './datepicker';

describe('UiDatepickerComponent', () => {
  let component: UiDatepickerComponent;
  let fixture: ComponentFixture<UiDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiDatepickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiDatepickerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
