import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostsHttpService {
	private readonly apiURL = "http://localhost:3000/posts";

  constructor(private httpClient: HttpClient) {

	}

	createPost(post: Post): Observable<Post> {
		return this.httpClient.post<Post>(`${this.apiURL}`, JSON.stringify(post));
	}

	getAllPosts(): Observable<Post[]> {
		return this.httpClient.get<Post[]>(this.apiURL);
	}

	getPost(id: string): Observable<Post> {
		return this.httpClient.get<Post>(`${this.apiURL}/${id}`);
	}

	updatePost(id: string, title: string, views?: number): Observable<Post> {
		let strViews = views != undefined ? `, "views": ${views}` : '';
		return this.httpClient.put<Post>(`${this.apiURL}/${id}`, `{"title": "${title}"${strViews}}`);
	}
	
	deletePost(id: string) {
		return this.httpClient.delete<Post>(`${this.apiURL}/${id}`);
	}
}
