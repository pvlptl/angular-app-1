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
      console.log('getPosts -> ' + data.message);
    });
  }

  getPostsUpdateListener() {
    return this.postsUpadted.asObservable();
  }

  addPost(post: PostModel) {
    this.http.post<{message: string, post: PostModel}>('http://localhost:3000/api/posts', post).subscribe(res => {
      console.log(res);
      this.posts.push(res.post);
      this.postsUpadted.next([...this.posts]);
    });
  }

  editPost(post: PostModel) {
    this.http.put<{message: string, post: PostModel}>(`http://localhost:3000/api/posts`, post).subscribe(res => {
      const posts = [...this.posts];
      const oldPostIndex = posts.findIndex(p => p.id === res.post.id);
      posts[oldPostIndex] = res.post;
      this.posts = posts;
      this.postsUpadted.next([...this.posts]);
      console.log(res);
    });
  }

  getPost(id: string) {
    return this.http.get<{post: PostModel}>(`http://localhost:3000/api/posts/${id}`);
  }

  deletePost(id: string) {
    this.http.delete<{message: string, post: PostModel}>(`http://localhost:3000/api/posts/${id}`).subscribe(res => {
      console.log(res);
      this.posts = this.posts.filter(post => post.id !== id); // lets generate a new array excluding the post which was deleted
      this.postsUpadted.next([...this.posts]);
    });
  }

}
