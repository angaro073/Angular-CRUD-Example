import { TestBed } from '@angular/core/testing';
import { PostsHttpService } from './posts-http.service';
import { Post } from './post';
import { firstValueFrom } from 'rxjs';

describe('PostsHttpService', () => {
  let service: PostsHttpService;
	let post: Post;

  beforeEach(async() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsHttpService);
		post = await firstValueFrom(service.createPost("My title"));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

	it('we can create posts and get every existing one', () => {
		let allPosts: Post[];
		service.createPost("Another title");
		service.getAllPosts().subscribe((posts) => {
			allPosts = posts;
			expect(allPosts.length).toBe(2);
		});
	});

	it('we can get a specific post based of its id', () => {
		service.getPost(post.id).subscribe((post) => {
			expect(post).not.toEqual(null);
		});
	});

	it('we can modify a post', () => {
		let newViewsNumber = ++post.views;
		service.updatePost(post.id, "Third title", newViewsNumber);
		service.getPost(post.id).subscribe((updatedPost) => {
			expect(updatedPost.title).toBe("Third title");
			expect(updatedPost.views).toBe(newViewsNumber);
		});
	});

	it('we can delete a post', () => {
		service.deletePost(post.id);
		service.getPost(post.id).subscribe((deletedPost) => {
			expect(deletedPost).toEqual(null);
		})
	});
});
