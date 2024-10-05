import { of } from 'rxjs';
import { PostsComponent } from './posts.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostService } from '../../services/Post/post.service';
import { Post } from '../../models/Post';
import { Component, Input } from '@angular/core';

describe('posts component', () => {
  let POSTS: Post[];
  let component: PostsComponent;
  let mockPostSerive: any;
  let fixture: ComponentFixture<PostsComponent>;


  @Component({
    selector: 'app-post',
    template: '<div></div>',
  })
  class FakePostComponent {
    @Input() post!:Post
  }

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
      declarations: [PostsComponent, FakePostComponent],
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
  it('should set posts from the service directly', () => {
    mockPostSerive.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges();
    expect(component.posts.length).toBe(3);
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
  });
});
