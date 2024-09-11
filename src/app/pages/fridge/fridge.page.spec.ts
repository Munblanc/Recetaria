import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FridgePage } from './fridge.page';

describe('FridgePage', () => {
  let component: FridgePage;
  let fixture: ComponentFixture<FridgePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FridgePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
