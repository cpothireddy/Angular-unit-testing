import { of } from 'rxjs';
import { PostsComponent } from './posts.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostService } from '../../services/Post/post.service';
import { Post } from '../../models/Post';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PostComponent } from './../post/post.component';

describe('posts component', () => {
  let POSTS: Post[];
  let component: PostsComponent;
  let mockPostSerive: any;
  let fixture: ComponentFixture<PostsComponent>;

  beforeEach(() => {
    POSTS = [
      {
        id: 1,
        body: 'body 1',
        title: 'title 1',
      },
      {
        id: 2,
        body: 'body 2',
        title: 'title 2',
      },
      {
        id: 3,
        body: 'body 3',
        title: 'title 3',
      },
    ];
    mockPostSerive = jasmine.createSpyObj(['getPosts', 'deletePost']);
    TestBed.configureTestingModule({
      declarations: [PostsComponent, PostComponent],
      providers: [
        {
          provide: PostService,
          useValue: mockPostSerive,
        },
      ],
    });
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
  });
  it('should create exact same number of Post Component with Posts', () => {
    mockPostSerive.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges();
    const postComponentDes = fixture.debugElement.queryAll(
      By.directive(PostComponent)
    );
    // By.directive will use to get the component element class
    expect(postComponentDes.length).toEqual(POSTS.length);
  });
  // below is the solution for 27.
  it('should check whether exact post is sending to PostComponent', () => {
    mockPostSerive.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges();
    const postComponentDes = fixture.debugElement.queryAll(
      By.directive(PostComponent)
    );
    for (let i = 0; i < postComponentDes.length; i++) {
      let postComponentIntsance = postComponentDes[i]
        .componentInstance as PostComponent;
      expect(postComponentIntsance.post.title).toEqual(POSTS[i].title);
    }
  });
  it('should set posts from the service directly', () => {
    mockPostSerive.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges();
    expect(component.posts.length).toBe(3);
  });
  it('should create one post child Element for each post', () => {
    mockPostSerive.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const postsElement = debugElement.queryAll(By.css('.posts'));
    expect(postsElement.length).toBe(POSTS.length);
  });
  describe('delete', () => {
    beforeEach(() => {
      mockPostSerive.deletePost.and.returnValue(of(true));
      component.posts = POSTS;
    });
    it('should delete the selected POST from the posts', () => {
      component.delete(POSTS[0]);
      expect(component.posts.length).toBe(2);
    });
    it('should delete the actual selected POST from the posts', () => {
      component.delete(POSTS[0]);
      for (let post of component.posts) {
        expect(post).not.toEqual(POSTS[0]);
      }
    });
    it('should call the delete method in Post Service only once', () => {
      component.delete(POSTS[0]);
      expect(mockPostSerive.deletePost).toHaveBeenCalledTimes(1);
    });
    // below is for 37
    it('should call delete method when post component button is clicked', () => {
      spyOn(component, 'delete');
      mockPostSerive.getPosts.and.returnValue(of(POSTS));
      fixture.detectChanges();

      let postComponentDEs = fixture.debugElement.queryAll(
        By.directive(PostComponent)
      );

      for (let i = 0; i < postComponentDEs.length; i++) {
        postComponentDEs[i]
          .query(By.css('button'))
          .triggerEventHandler('click', { preventDefault: () => {} });
        expect(component.delete).toHaveBeenCalledWith(POSTS[i]);
      }
    });

  });
});
