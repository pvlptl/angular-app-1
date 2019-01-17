import {PostModel} from './post.model';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: PostModel[] = [];
  getPosts() {
    return [...this.posts];
  }
  addPost(post: PostModel) {
    this.posts.unshift(post);
  }
}
