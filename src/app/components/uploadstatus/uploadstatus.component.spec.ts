import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadstatusComponent } from './uploadstatus.component';

describe('UploadstatusComponent', () => {
  let component: UploadstatusComponent;
  let fixture: ComponentFixture<UploadstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadstatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
