import {Component, EventEmitter, Output} from '@angular/core';
import {PostModel} from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent {
  title = '';
  content = '';
  @Output() postCreated = new EventEmitter<PostModel>();
  onAddPost() {
    const post: PostModel = {
      title: this.title,
      content: this.content,
    };
    this.postCreated.emit(post);
  }
}
