import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QluserComponent } from './qluser.component';

describe('QluserComponent', () => {
  let component: QluserComponent;
  let fixture: ComponentFixture<QluserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QluserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QluserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
