import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRecipientsComponent } from './list-recipients.component';

describe('ListRecipientsComponent', () => {
  let component: ListRecipientsComponent;
  let fixture: ComponentFixture<ListRecipientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRecipientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRecipientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
