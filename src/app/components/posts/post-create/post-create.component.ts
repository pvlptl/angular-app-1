import {Component, EventEmitter, Output} from '@angular/core';
import {PostModel} from '../post.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent {
  @Output() postCreated = new EventEmitter<PostModel>();
  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const {title, content} = form.value;
    const post: PostModel = {
      title,
      content
    };
    this.postCreated.emit(post);
  }
}
