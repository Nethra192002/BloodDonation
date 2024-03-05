import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodDonatedComponent } from './blood-donated.component';

describe('BloodDonatedComponent', () => {
  let component: BloodDonatedComponent;
  let fixture: ComponentFixture<BloodDonatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodDonatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloodDonatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
