import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PostDetailComponent } from './post-detail.component';
import { PostService } from 'src/app/services/Post/post.service';
import { of } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { By } from '@angular/platform-browser';

describe('PostDetailComponent', () => {
  let fixture: ComponentFixture<PostDetailComponent>;
  let mockPostService: jasmine.SpyObj<PostService>;
  beforeEach(() => {
    let mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return '3';
          },
        },
      },
    };

    mockPostService = jasmine.createSpyObj(['getPost', 'updatePost']);
    let mockLocation = jasmine.createSpyObj(['back']);

    TestBed.configureTestingModule({
      declarations: [PostDetailComponent],
      imports: [FormsModule],
      providers: [
        { provide: Location, useValue: mockLocation },
        { provide: PostService, useValue: mockPostService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    });

    fixture = TestBed.createComponent(PostDetailComponent);
  });

  it('should render the post title in h2 template', () => {
    mockPostService.getPost.and.returnValue(
      of({
        id: 3,
        title: 'Title 1',
        body: 'Body 1',
      } as Post)
    );
    fixture.detectChanges(); // this will update the oninit data in component.
    const element = fixture.debugElement.query(By.css('h2'))
      .nativeElement as HTMLElement;
    expect(element.textContent).toBe(fixture.componentInstance.post.title);
  });
});
