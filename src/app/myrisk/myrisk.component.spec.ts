import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyriskComponent } from './myrisk.component';

describe('MyriskComponent', () => {
  let component: MyriskComponent;
  let fixture: ComponentFixture<MyriskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyriskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyriskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
