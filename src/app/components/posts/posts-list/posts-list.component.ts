import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostModel} from '../post.model';
import {PostsService} from '../posts.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})

export class PostsListComponent implements OnInit, OnDestroy {
  posts: PostModel[] = [];
  private postsSub: Subscription;
  constructor(public postsService: PostsService) {}
  ngOnInit() {
    this.posts = this.postsService.getPosts();
    this.postsSub = this.postsService.getPostsUpdateListener().subscribe((posts: PostModel[]) => {
      this.posts = posts;
    });
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }

}
