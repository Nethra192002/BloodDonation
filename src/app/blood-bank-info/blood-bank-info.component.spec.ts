import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodBankInfoComponent } from './blood-bank-info.component';

describe('BloodBankInfoComponent', () => {
  let component: BloodBankInfoComponent;
  let fixture: ComponentFixture<BloodBankInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodBankInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloodBankInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
