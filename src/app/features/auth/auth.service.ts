import { Injectable } from "@angular/core";
import { type UserCredential } from "@angular/fire/auth";
import { type Observable, catchError, map, of, switchMap } from "rxjs";
import { AuthFirebaseService } from "./auth-firebase.service";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	constructor(private readonly authFirebaseService: AuthFirebaseService) {}

	public signUp(
		username: string,
		email: string,
		password: string,
	): Observable<string> {
		return this.authFirebaseService
			.createUserWithEmailAndPassword(email, password)
			.pipe(
				switchMap((userCredential: UserCredential) => {
					if (userCredential?.user) {
						return this.updateUsername(
							userCredential,
							userCredential.user?.displayName as string,
						);
					}

					return of("createUserWithEmailAndPasswordFailed");
				}),
				catchError(() => of("createUserWithEmailAndPasswordFailed")),
			);
	}

	private updateUsername(
		userCredential: UserCredential,
		username: string,
	): Observable<string> {
		return this.authFirebaseService
			.updateProfile(userCredential.user,username )
			.pipe(
				map(() => "success"),
				catchError((e) => of("updateProfileFailed")),
			);
	}

	public signIn(email: string, password: string): Observable<UserCredential> {
		return this.authFirebaseService.signIn(email, password).pipe(
			map((userCredential) => userCredential.user),
			catchError((error) => {
				console.error("%c🍟🍔🍕 auth.service.ts[ln:47]", error);
				return of(error);
			}),
		);
		// .pipe(map((u) =>u.user.));
	}

	public authState() {
		return this.authFirebaseService.authState();
	}
}
