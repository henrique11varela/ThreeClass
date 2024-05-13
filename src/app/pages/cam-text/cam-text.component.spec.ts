import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamTextComponent } from './cam-text.component';

describe('CamTextComponent', () => {
  let component: CamTextComponent;
  let fixture: ComponentFixture<CamTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CamTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CamTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
