import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GyroModelComponent } from './gyro-model.component';

describe('GyroModelComponent', () => {
  let component: GyroModelComponent;
  let fixture: ComponentFixture<GyroModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GyroModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GyroModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
