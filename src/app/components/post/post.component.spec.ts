import { first } from 'rxjs';
import { Post } from '../../models/Post';
import { PostComponent } from './post.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('post component', () => {
  let fixture: ComponentFixture<PostComponent>;
  let comp: PostComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostComponent],
      // post.component.html, we have anchor tag with routerLink, so we will get error like below,
      // Can't bind to 'routerLink' since it isn't a known property of 'a'
      // for that we have to include router module to make known property
      // will discuss it in upcoming discussions, but for now let use NO_ERROR_SCHEMA
      // NO_ERROR_SCHEMA, will hide the template errors if any
      schemas: [NO_ERRORS_SCHEMA], // supress the console errors
    });
    fixture = TestBed.createComponent(PostComponent);
    comp = fixture.componentInstance;
  });
  it('create a component with testBed', () => {
    expect(comp).toBeDefined();
  });

  it('should render the post title in the anchor element', () => {
    const post: Post = {
      id: 1,
      body: 'body 1',
      title: 'title 1',
    };
    comp.post = post;
    fixture.detectChanges(); // by using detect changes template will get update with the data we provided here.
    const postElement: HTMLElement = fixture.nativeElement;
    const a = postElement.querySelector('a');
    expect(a?.textContent).toContain(post.title);
  });

  it('should render the post title in the anchor element using debug element', () => {
    const post: Post = {
      id: 1,
      body: 'body 1',
      title: 'title 1',
    };
    comp.post = post;
    fixture.detectChanges();
    // nativeElement, is available only on browser level
    // if you are running the test in server or web worker then debugElement is useful
    const postDebugElement = fixture.debugElement;
    const aElement: HTMLElement = postDebugElement.query(
      By.css('a')
    ).nativeElement;
    expect(aElement?.textContent).toContain(post.title);
  });

  it('should raise an event when the delete post is clicked', () => {
    const post: Post = {
      id: 1,
      body: 'body 1',
      title: 'title 1',
    };
    comp.post = post;

    comp.delete.pipe(first()).subscribe((selectedPost) => {
      expect(selectedPost).toEqual(post);
    });
    comp.onDeletePost(new MouseEvent('click'));
  });
});
