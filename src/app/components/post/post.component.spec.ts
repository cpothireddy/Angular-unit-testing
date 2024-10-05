import { first } from "rxjs";
import { Post } from "../../models/Post";
import { PostComponent } from "./post.component"

describe('post component', ()=>{
  it('should raise an event when the delete post is clicked', ()=>{
    const comp = new PostComponent();
    const post:Post = {
      id: 1,
      body: 'body 1',
      title: 'title 1',
    };
    comp.post = post;
    // the below one is for the eventEmitter in component: this.delete.emit(this.post);

    comp.delete.pipe(first()).subscribe((selectedPost)=>{
      expect(selectedPost).toEqual(post);
    });
    comp.onDeletePost(new MouseEvent('click'));
  })
})
