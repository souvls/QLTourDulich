import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QLticketComponent } from './qlticket.component';

describe('QLticketComponent', () => {
  let component: QLticketComponent;
  let fixture: ComponentFixture<QLticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QLticketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QLticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
