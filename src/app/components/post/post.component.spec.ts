import { first } from 'rxjs';
import { Post } from '../../models/Post';
import { PostComponent } from './post.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('post component', () => {
  let fixture: ComponentFixture<PostComponent>;
  let comp: PostComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostComponent],
    });
    // the above one is creating the testing module
    fixture = TestBed.createComponent(PostComponent);
    // the above is for creating a component
    comp = fixture.componentInstance;
  });
  it('create a component with testBed', () => {
    // the above one is for creating a instance for the comonent, we can access all the methods and properties using this instance.
    expect(comp).toBeDefined();
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
