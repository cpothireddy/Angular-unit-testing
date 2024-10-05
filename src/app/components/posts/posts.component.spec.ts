import { of } from 'rxjs';
import { PostsComponent } from './posts.component';
import { TestBed } from '@angular/core/testing';
import { PostService } from '../../services/Post/post.service';
import { Post } from '../../models/Post';


// this is another way to create mockPostService with fake methods available in service
class mockPostService {
  getPosts() {
  }

  deletePost(post: Post) {
    return of(true);
  }
}

describe('posts component', () => {
  let POSTS: Post[];
  let component: PostsComponent;
  let postService: any;
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
    TestBed.configureTestingModule({
      providers:[
        PostsComponent,
        {
          provide: PostService,
          useClass:mockPostService
        }
      ]
    })
    component = TestBed.inject(PostsComponent);
    postService = TestBed.inject(PostService);
  });
  describe('delete', () => {
    it('should delete the selected POST from the posts', () => {
      component.posts = POSTS;
      component.delete(POSTS[0]);
      expect(component.posts.length).toBe(2);
    });
    it('should delete the actual selected POST from the posts', () => {
      component.posts = POSTS;
      component.delete(POSTS[0]);
      for (let post of component.posts) {
        expect(post).not.toEqual(POSTS[0]);
      }
    });
    it('should call the delete method in Post Service only once', () => {
      component.posts = POSTS;
      spyOn(postService, 'deletePost').and.callThrough();
      component.delete(POSTS[0]);
      expect(postService.deletePost).toHaveBeenCalledTimes(1);
    });
  });
});
