import { Injectable } from "@angular/core";
// biome-ignore lint/style/useImportType: <explanation>
import {
	Auth,
	AuthProvider,
	type User,
	type UserCredential,
	authState,
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile
} from "@angular/fire/auth";
import { type Observable, from } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class AuthFirebaseService {
	public constructor(private readonly auth: Auth) {}

	public createUserWithEmailAndPassword(
		email: string,
		password: string,
	): Observable<UserCredential> {
		return from(createUserWithEmailAndPassword(this.auth, email, password));
	}

	public updateProfile(
		user: User,
		displayName?: string,
		photoURL?: string,
	): Observable<void> {
		return from(updateProfile(user, { displayName, photoURL: photoURL }));
	}

	public signIn(email: string, password: string): Observable<UserCredential> {
		return from(signInWithEmailAndPassword(this.auth, email, password));
	}

	public signOut(): Observable<void> {
		return from(signOut(this.auth));
	}

	public authState(): Observable<User | null> {
		return authState(this.auth);
	}

	public getAuth(): Auth {
		return getAuth();
	}

	public signInWithPopup(auth: Auth, provider: AuthProvider) {
		return from(signInWithPopup(auth, provider));
	}
}
