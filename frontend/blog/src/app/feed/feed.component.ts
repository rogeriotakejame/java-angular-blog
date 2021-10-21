import { Component, OnInit } from '@angular/core';
import { Post } from '../model/Post';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  listPost: Post[];
  showPosts: Post[];
  post: Post = new Post();
  busca: string;

  constructor(
    private postService:PostService,
  ) { }

  ngOnInit() {
    this.findPosts();
  }

  findPosts() {
    this.postService.getPosts().subscribe((data: Post[]) =>{
      this.listPost = data;
      this.executaBusca();
      console.log(this.listPost);
      console.log(this.showPosts);
    });
  }

  cadastrarMensagem() {
    this.postService.postMensagem(this.post).subscribe((data: Post) => {
      /*this.post = data;
      location.assign('/feed');*/
      this.listPost=[...this.listPost, data];
    });
  }

  executaBusca() {
    if(this.busca==="" || this.busca===undefined){
      this.showPosts = [...this.listPost];
    } else {
      console.log(this.busca);
      console.log(this.busca!=="");
      this.showPosts = this.listPost.filter(post => post.nome===this.busca);
    }
  }
}
