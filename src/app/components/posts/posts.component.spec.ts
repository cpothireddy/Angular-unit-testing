import { of } from 'rxjs';
import { Post } from '../../models/Post';
import { PostsComponent } from './posts.component';

describe('post component', () => {
  let POSTS: Post[];
  let component: PostsComponent;
  let mockPostService: any;
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
    // the postscomponent is depends on the postService and postService is again depends on the http service, here we are creating isolated test, so lets have createSpyObj on postservice
    mockPostService = jasmine.createSpyObj(['getPosts', 'deletePost']);
    component = new PostsComponent(mockPostService);
  });
  describe('delete', () => {
    it('should delete the selected POST from the posts', () => {
      component.posts = POSTS;
      // If we directly execute above code we will get error
      // TypeError: Cannot read properties of undefined (reading 'subscribe')
      // since, we are returing the subscribe observable in component mockPostService delete post.
      // for that we should return some return value on mackservice
      mockPostService.deletePost.and.returnValue(of(true));
      // in above line we are returning of type observable, that may be any observable we should return.
      component.delete(POSTS[0]);

      expect(component.posts.length).toBe(2);
    });

    it('should delete the actual selected POST from the posts', () => {
      component.posts = POSTS;
      mockPostService.deletePost.and.returnValue(of(true));
      component.delete(POSTS[0]);
      for (let post of component.posts) {
        expect(post).not.toEqual(POSTS[0]);
      }
    });
    it('should call the delete method in Post Service only once', () => {
      component.posts = POSTS;
      mockPostService.deletePost.and.returnValue(of(true));
      component.delete(POSTS[0]);
      // here we are checking mockPostService.deletePost should call only one time in delete method.
      expect(mockPostService.deletePost).toHaveBeenCalledTimes(1);
    });
  });
});
