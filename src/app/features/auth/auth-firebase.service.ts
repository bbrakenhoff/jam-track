import { Injectable } from "@angular/core";
// biome-ignore lint/style/useImportType: <explanation>
import {
	Auth,
	authState,
	createUserWithEmailAndPassword,
	getAuth,
	GoogleAuthProvider,
	OAuthCredential,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
	user,
	type User,
	type UserCredential,
} from "@angular/fire/auth";
import { type Observable, Subject, from } from "rxjs";

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

	public googleSignIn(): Observable<OAuthCredential | null> {
		const userCredentialSubject = new Subject<OAuthCredential | null>();
		const provider = new GoogleAuthProvider();
		const auth = getAuth();
		signInWithPopup(auth, provider)
			.then((userCredential: UserCredential) => {
				const credentialFromResult =
					GoogleAuthProvider.credentialFromResult(userCredential);
				userCredentialSubject.next(credentialFromResult);
			})
			.catch((error) => {
				userCredentialSubject.error(
					GoogleAuthProvider.credentialFromError(error),
				);
			});

		return userCredentialSubject.asObservable();
	}
}
