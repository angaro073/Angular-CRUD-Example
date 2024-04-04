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

	createPost(title: string): Observable<Post> {
		return this.httpClient.post<Post>(`${this.apiURL}`, `{"title": "${title}", "views": 0}`);
	}

	getAllPosts(): Observable<Post[]> {
		return this.httpClient.get<Post[]>(this.apiURL);
	}

	// getPost(id: string): Observable<Post> {
	// 	return this.httpClient.get<Post>(`${this.apiURL}/${id}`);
	// }


	// updatePost(id: string, title: string): Observable<Post> {
	// 	return this.httpClient.put<Post>(`${this.apiURL}/${id}`, `{"title": ${title}, "views": 0}`);
	// }
	
	// deletePost(id: string) {
	// 	return this.httpClient.delete<Post>(`${this.apiURL}/${id}`);
	// }
}
