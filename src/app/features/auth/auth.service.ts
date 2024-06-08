import { Injectable } from '@angular/core';
import { AuthFirebaseService } from './auth-firebase.service';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { UserCredential } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly authFirebaseService: AuthFirebaseService) { }

  public signUp(username: string, email: string, password: string): Observable<string> {
    return this.authFirebaseService.createUserWithEmailAndPassword(email, password)
      .pipe(switchMap((userCredential: UserCredential) => {
        if (userCredential && userCredential.user) {
          return this.updateUsername(userCredential, username);
        } else {
          return of('createUserWithEmailAndPasswordFailed');
        }
      }), catchError(() => of('createUserWithEmailAndPasswordFailed')));
  }

  private updateUsername(userCredential: UserCredential, username: string): Observable<string> {
    return this.authFirebaseService.updateProfile(userCredential.user, { displayName: username })
      .pipe(
        map(() => 'success'),
        catchError((e) => of('updateProfileFailed'))
      );
  }
}
