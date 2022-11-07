import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SabiasQueComponent } from './sabias-que.component';

describe('SabiasQueComponent', () => {
  let component: SabiasQueComponent;
  let fixture: ComponentFixture<SabiasQueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SabiasQueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SabiasQueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
