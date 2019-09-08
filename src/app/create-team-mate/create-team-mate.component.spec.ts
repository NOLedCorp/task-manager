import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTeamMateComponent } from './create-team-mate.component';

describe('CreateTeamMateComponent', () => {
  let component: CreateTeamMateComponent;
  let fixture: ComponentFixture<CreateTeamMateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTeamMateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTeamMateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
