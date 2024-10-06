import { TestBed } from '@angular/core/testing';
import { PostService } from './post.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('postService (HttpClienttestingModule)', () => {
  let postService: PostService;
  let httpTestingController: HttpTestingController;
  let POSTS = [
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
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostService],
      imports: [HttpClientTestingModule],
    });
    postService = TestBed.inject(PostService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  describe('getPosts()', () => {
    it('should return posts when getPosts() is called', (done: DoneFn) => {
      postService.getPosts().subscribe((data) => {
        expect(data).toEqual(POSTS);
        done();
      });
      // we will have all http methods in httpTestingController
      const request = httpTestingController.expectOne(
        'https://jsonplaceholder.typicode.com/posts'
      );
      request.flush(POSTS);
      expect(request.request.method).toBe('GET');
    });
  });
  describe('getPost()', () => {
    it('should return single post when getpost is called with postId', () => {
      postService.getPost(1).subscribe();
      postService.getPost(2).subscribe();
      // In above, we are calling two APIs
      const request = httpTestingController.expectOne(
        `https://jsonplaceholder.typicode.com/posts/1`
      );
      // actually we have two open API calls, but we tested only one and other one is never tested.
      expect(request.request.method).toBe('GET');
      // Now, the requirement is, I want to visit all APIs we made.
      // should allow only one API, which we made in expectOne
     // httpTestingController.verify(); // this will verify all the API calls in this test. it will through error, if there is no vist
    });
    afterEach(()=>{
      httpTestingController.verify();// this will check all the API calls and return error if there is any open call
    })
  });
});
