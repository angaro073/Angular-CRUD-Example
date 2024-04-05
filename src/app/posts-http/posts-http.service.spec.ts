import { TestBed } from '@angular/core/testing';
import { PostsHttpService } from './posts-http.service';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { POSTS } from '../mock-data/posts';
import { Post } from './post';
import { provideHttpClient } from '@angular/common/http';
describe('PostsHttpService', () => {
	let service: PostsHttpService;
	let testingController: HttpTestingController;

	beforeEach(async () => {
		TestBed.configureTestingModule({
			providers: [provideHttpClient(), provideHttpClientTesting(), HttpClientTestingModule],
		});
		service = TestBed.inject(PostsHttpService);
		testingController = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		testingController.verify();
	});

	it('service should be created', () => {
		expect(service).toBeTruthy();
	});

	it('can create posts (POST request)', () => {
		const newPost: Post = {
			id: "4",
			title: "Fourth title",
			views: 4000
		};
		service.createPost(newPost).subscribe((post) => {
			expect(post).toBeTruthy();
			expect(post).toEqual(newPost);
		});
		const mockRequest = testingController.expectOne("http://localhost:3000/posts");
		expect(mockRequest.request.method).toEqual("POST");
		mockRequest.flush(newPost);
	});

	it('can get every existing post (GET request)', () => {
		service.getAllPosts().subscribe((posts) => {
			expect(posts).toBeTruthy();
			expect(posts.length).toEqual(3);
		});
		const mockRequest = testingController.expectOne("http://localhost:3000/posts");
		expect(mockRequest.request.method).toEqual("GET");
		mockRequest.flush(Object.values(POSTS));
	});

	it('can get a specific post based of its id (GET request)', () => {
		service.getPost("1").subscribe((post) => {
			expect(post).toBeTruthy();
			expect(post.id).toBe("1");
			expect(post.title).toBe("First title");
			expect(post.views).toBe(100);
		});
		const mockRequest = testingController.expectOne(`http://localhost:3000/posts/1`);
		expect(mockRequest.request.method).toEqual("GET");
		mockRequest.flush(POSTS["1"]);
	});

	it('can modify posts (PUT request)', () => {
		let changes = {
			title: "Second title changed",
			views: 2000
		}
		let modifiedPost = POSTS["2"];
		modifiedPost.title = "Second title changed";
		service.updatePost("2", changes.title, changes.views)
			.subscribe((updatedPost) => {
				expect(updatedPost).toBeTruthy();
				expect(updatedPost).not.toEqual(POSTS["2"])
			});
		const mockRequest = testingController.expectOne(`http://localhost:3000/posts/2`);
		expect(mockRequest.request.method).toEqual("PUT");
		expect(JSON.parse(mockRequest.request.body).title).toEqual(modifiedPost.title);
	});

	it('can delete posts (DELETE request)', () => {
		service.deletePost("3").subscribe((post) => {
			expect(post).toBeTruthy();
			expect(post).toEqual(POSTS["3"]);
		});
		const mockRequest = testingController.expectOne(`http://localhost:3000/posts/3`);
		expect(mockRequest.request.method).toEqual("DELETE");
		mockRequest.flush(POSTS["3"]);
	});
});
