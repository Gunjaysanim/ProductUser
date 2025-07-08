import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './Model/User';
import { configurl } from './assets/config'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

url = configurl.apiServer.url + '/user';
  constructor(private http: HttpClient) { }
  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }
  postUserData(userData: User): Observable<User> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<User>(this.url, userData, httpHeaders);
  }
   // ✅ POST method to add a user
  addUser(user: User): Observable<any> {
    return this.http.post(`${this.url}`, user);
  }
  updateUser(user: User): Observable<User> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.put<User>(this.url, user, httpHeaders);
  }
  deleteUserById(id: number): Observable<number> {
    return this.http.delete<number>(this.url + '/' + id);
  }
  getUserDetailsById(id: string): Observable<User> {
    return this.http.get<User>(this.url + '/' + id);
  }
}
