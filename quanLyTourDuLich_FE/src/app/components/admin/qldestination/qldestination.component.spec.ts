import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QLdestinationComponent } from './qldestination.component';

describe('QLdestinationComponent', () => {
  let component: QLdestinationComponent;
  let fixture: ComponentFixture<QLdestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QLdestinationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QLdestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
