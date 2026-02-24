import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiToastComponent } from './toast';

describe('UiToastComponent', () => {
  let component: UiToastComponent;
  let fixture: ComponentFixture<UiToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiToastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiToastComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
