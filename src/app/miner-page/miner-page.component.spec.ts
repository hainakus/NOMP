import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinerPageComponent } from './miner-page.component';

describe('MinerPageComponent', () => {
  let component: MinerPageComponent;
  let fixture: ComponentFixture<MinerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinerPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
