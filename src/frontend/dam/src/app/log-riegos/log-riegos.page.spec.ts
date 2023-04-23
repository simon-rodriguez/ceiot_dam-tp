import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogRiegosPage } from './log-riegos.page';

describe('LogRiegosPage', () => {
  let component: LogRiegosPage;
  let fixture: ComponentFixture<LogRiegosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LogRiegosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
