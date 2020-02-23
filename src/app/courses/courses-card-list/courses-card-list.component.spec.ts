import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesCardListComponent } from './courses-card-list.component';
import { CoursesModule } from '../courses.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { setupCourses } from '../common/setup-test-data';

describe('CoursesCardListComponent', () => {
  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          CoursesModule
        ]
      })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CoursesCardListComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        component.courses = setupCourses();
        fixture.detectChanges();
      });
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy('Could not create component');
  });


  it('should display the course list', () => {
    const cardList = el.queryAll(By.css('.course-card'));

    expect(cardList).toBeTruthy('Could not find a course-card list');
    expect(cardList.length).toBe(12, 'Unexpected number of elements');
  });


  it('should display the first course with all required contents', () => {
    const course = component.courses[0];
    const card = el.query(By.css('.course-card:first-child'));
    const title = card.query(By.css('mat-card-title'));
    const image = card.query(By.css('img'));
    const actions = card.queryAll(By.css('.course-actions>.mat-raised-button'));

    expect(card).toBeTruthy('Could not find a courses-card');
    expect(title.nativeElement.textContent).toBe(course.titles.description, 'Could not find course title');
    expect(image.nativeElement.src).toBe(course.iconUrl, 'Could not find course image');
    expect(actions.length).toBe(2, 'Could not find actions buttons');
  });

  it('should editCourse on click Edit button', async(() => {
    const editCourseSpy = spyOn(component, 'editCourse');
    const course = component.courses[0];
    const card = el.query(By.css('.course-card:first-child'));
    const button = card.query(By.css('.course-actions>.mat-accent'));
    expect(button.nativeElement.textContent.trim()).toBe('EDIT');
    button.nativeElement.click();

    fixture.whenStable().then(() => {
      expect(editCourseSpy).toHaveBeenCalledWith(course);
    });
  }));

  it('should have href with with course id for View Course button', () => {
    const course = component.courses[0];
    const card = el.query(By.css('.course-card:first-child'));
    const button = card.query(By.css('.course-actions>.mat-primary'));

    expect(button.nativeElement.textContent.trim()).toBe('VIEW COURSE');
    expect(button.nativeElement.pathname).toEqual(`/courses/${course.id}`);
  });

});


