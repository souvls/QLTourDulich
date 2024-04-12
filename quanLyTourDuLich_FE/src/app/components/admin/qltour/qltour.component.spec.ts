import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QLtourComponent } from './qltour.component';

describe('QLtourComponent', () => {
  let component: QLtourComponent;
  let fixture: ComponentFixture<QLtourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QLtourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QLtourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
