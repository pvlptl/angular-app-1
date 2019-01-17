import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {PostModel} from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: PostModel[] = [];
  private postsUpadted = new Subject<PostModel[]>();

  getPosts() {
    return [...this.posts];
  }

  getPostsUpdateListener() {
    return this.postsUpadted.asObservable();
  }

  addPost(post: PostModel) {
    this.posts.unshift(post);
    this.postsUpadted.next([...this.posts]);
  }
}
