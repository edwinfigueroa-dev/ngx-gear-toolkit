import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiIconComponent } from './icon';

describe('UiIconComponent', () => {
  let component: UiIconComponent;
  let fixture: ComponentFixture<UiIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiIconComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
