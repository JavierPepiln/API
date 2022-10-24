import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiginGoogleComponent } from './sigin-google.component';

describe('SiginGoogleComponent', () => {
  let component: SiginGoogleComponent;
  let fixture: ComponentFixture<SiginGoogleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiginGoogleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiginGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
