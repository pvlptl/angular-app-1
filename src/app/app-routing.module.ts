import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostsListComponent} from './components/posts/posts-list/posts-list.component';
import {PostCreateComponent} from './components/posts/post-create/post-create.component';

const routes: Routes = [
  { path: '', component: PostsListComponent },
  { path: 'create', component: PostCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
