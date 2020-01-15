import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../_models/user';
import {API_URL, SIGN_IN} from '../globals/global-variables';


@Injectable({ providedIn: 'root' })
export class SignInService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {

    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(API_URL + SIGN_IN, { username: email, password })
      .pipe(map(obj => {
        // login successful if there's a jwt token in the response
        console.log(obj);
        const token = obj.token;

        let user: User;
        user = obj.user;
        if (obj) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          console.log(localStorage.getItem('currentUser'));
          localStorage.setItem('token', token);
          this.currentUserSubject.next(user);
          console.log(this.currentUser);


        }

        return obj;
      }, error => console.log('error', error)));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }
}
