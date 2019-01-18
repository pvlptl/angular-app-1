import {Component, OnInit} from '@angular/core';
import {PostModel} from '../post.model';
import {NgForm} from '@angular/forms';
import {PostsService} from '../posts.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit{

  private mode = 'create';
  private postId: string;
  post: PostModel;

  constructor(public postsService: PostsService, public route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.postId = paramMap.get('id');
        this.postsService.getPost(this.postId).subscribe(res => {
          console.log(res);
          this.post = res.post;
        });
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const {title, content} = form.value;
    const post: PostModel = {
      id: null,
      title,
      content
    };
    if (this.mode === 'create') {
      form.resetForm();
      this.postsService.addPost(post); // create post
    }
    else { // edit post
      post.id = this.post.id;
      this.postsService.editPost(post);
    }
  }
}
