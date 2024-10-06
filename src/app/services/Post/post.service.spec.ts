import { HttpClient } from '@angular/common/http';
import { PostService } from './post.service';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';

describe('post Service', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let postService: PostService;
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
    // Since http call is a server call, which we should not do actual one.
    // so, let create a scpy object on http mthod
    let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get']);
    // here, httpClientSpyObj is like nothing but the httpClient Module which we injected in service.

    TestBed.configureTestingModule({
      providers: [
        PostService,
        { provide: HttpClient, useValue: httpClientSpyObj },
      ],
    });
    postService = TestBed.inject(PostService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });
  describe('getPosts()', () => {
    it('should return expected posts when getPosts is called', (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(of(POSTS));
      postService.getPosts().subscribe({
        next: (posts) => {
          expect(posts).toEqual(POSTS);
          done();
        },
        error: () => {
          done.fail;
        },
      });
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });
  });
});
