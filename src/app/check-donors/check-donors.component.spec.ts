import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckDonorsComponent } from './check-donors.component';

describe('CheckDonorsComponent', () => {
  let component: CheckDonorsComponent;
  let fixture: ComponentFixture<CheckDonorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckDonorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckDonorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
