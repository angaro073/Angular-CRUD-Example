import { TestBed } from '@angular/core/testing';
import { PostsHttpService } from './posts-http.service';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { POSTS } from '../mock-data/posts';
import { provideHttpClient } from '@angular/common/http';
describe('PostsHttpService', () => {
  let service: PostsHttpService;
	let testingController: HttpTestingController;

  beforeEach(async() => {
    TestBed.configureTestingModule({
			providers: [provideHttpClient(), provideHttpClientTesting(), HttpClientTestingModule],
		});
    service = TestBed.inject(PostsHttpService);
		testingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

	// it('we can create posts and get every existing one', () => {
	// 	let allPosts: Post[];
	// 	const allPostsObservable =service.getAllPosts().pipe(
	// 		switchMap((posts) => of(posts)),
	// 		tap((posts) => allPosts = posts),
  // 		() => service.createPost("Another title"), 
  // 		() => service.getAllPosts(),
	// 	);
	// 	const allPostsSubscription = allPostsObservable.subscribe(posts => {
  // 		expect(posts.length).toBeGreaterThan(allPosts.length);
	// 	});
	// 	setTimeout(() => allPostsSubscription.unsubscribe(), 2000);
	// });

	it('we can get a specific post based of its id', () => {
		service.getPost("1").subscribe((post) => {
			expect(post).toBeTruthy();
			expect(post.id).toBe("1");
			expect(post.title).toBe("First title");
			expect(post.views).toBe(100);
		});
		const mockReq = testingController.expectOne(`http://localhost:3000/posts/1`);
		expect(mockReq.request.method).toEqual("GET");
		mockReq.flush(POSTS["1"]);
		testingController.match(`http://localhost:3000/posts/1`);
		testingController.expectNone(`http://localhost:3000/posts/1`);
	});

	it('we can modify a post', () => {
		let changes = {
			title: "Second title changed",
			views: 2000
		}
 		service.updatePost("2", changes.title, changes.views)
		.subscribe((updatedPost) => {
				expect(updatedPost).toBeTruthy();
		});
		const mockReq = testingController.expectOne(`http://localhost:3000/posts/2`);
		expect(mockReq.request.method).toEqual("PUT");
		let modifiedPost = POSTS["2"];
		modifiedPost.title = "Second title changed";
		expect(JSON.parse(mockReq.request.body).title).toEqual(modifiedPost.title);
		testingController.match(`http://localhost:3000/posts/2`);
		testingController.expectNone(`http://localhost:3000/posts/2`);
	});

	// it('we can delete a post', () => {
	// 	service.deletePost("3").subscribe((post) => {
	// 		expect(post).toBeTruthy();
	// 	});
	// 	const mockReq = testingController.expectOne(`http://localhost:3000/posts/3`);
	// 	expect(mockReq.request.method).toEqual("DELETE");
	// });

	afterEach(() => {
		testingController.verify();
	});
});
