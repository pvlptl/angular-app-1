import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {PostModel} from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: PostModel[] = [];
  private postsUpadted = new Subject<PostModel[]>();

  constructor(private http: HttpClient) {

  }

  getPosts() {
    this.http.get<{message: string, posts: PostModel[]}>('http://localhost:3000/api/posts').subscribe(data => {
      this.posts = data.posts;
      this.postsUpadted.next([...this.posts]);
    });
  }

  getPostsUpdateListener() {
    return this.postsUpadted.asObservable();
  }

  addPost(post: PostModel) {
    this.posts.unshift(post);
    this.postsUpadted.next([...this.posts]);
  }
}
