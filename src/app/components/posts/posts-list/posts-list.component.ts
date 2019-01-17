import {Component, Input} from '@angular/core';
import {PostModel} from '../post.model';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})

export class PostsListComponent {
  @Input() posts: PostModel[] = [];
}
