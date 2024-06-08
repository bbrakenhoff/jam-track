import { Injectable } from '@angular/core';
import { Auth, User, UserCredential, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {

  public constructor(private readonly auth: Auth) { }

  public createUserWithEmailAndPassword(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  public updateProfile(user: User, { displayName, photoURL: photoUrl }: {
    displayName?: string | null;
    photoURL?: string | null;
  }): Observable<void> {
    return from(updateProfile(user, { displayName, photoURL: photoUrl }));
  }

  public signIn(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  public signOut(): Observable<void> {
    return from(signOut(this.auth));
  }

  public authState(): Observable<User | null> {
    return from(authState(this.auth));
  }
}
