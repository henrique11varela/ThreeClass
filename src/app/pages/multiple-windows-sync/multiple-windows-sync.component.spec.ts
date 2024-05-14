import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleWindowsSyncComponent } from './multiple-windows-sync.component';

describe('MultipleWindowsSyncComponent', () => {
  let component: MultipleWindowsSyncComponent;
  let fixture: ComponentFixture<MultipleWindowsSyncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleWindowsSyncComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleWindowsSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
