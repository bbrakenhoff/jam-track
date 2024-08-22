import { TestBed } from "@angular/core/testing";
import {
	Auth,
	GoogleAuthProvider,
	OAuthCredential,
	UserCredential,
} from "@angular/fire/auth";
import { of, throwError } from "rxjs";
import { AuthFirebaseService } from "./auth-firebase.service";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
	let service: AuthService;

	const authFirebaseServiceMock = {
		createUserWithEmailAndPassword: jest.fn(),
		updateProfile: jest.fn(),
		signIn: jest.fn(),
		auth: {} as Auth,
		getAuth: jest.fn(),
		signInWithPopup: jest.fn(),
	};

	const testData = {
		displayName: "Harry Potter",
		email: "harry.potter@hogwarts.com",
		password: "HP31081980",
	};

	const fakeReturnData = {
		userCredential: {
			user: {
				displayName: testData.displayName,
				email: testData.email,
			},
		} as UserCredential,
		oauthCredential: {
			accessToken: "accesstoken123",
		} as OAuthCredential,
	};

	beforeEach(() => {
		jest.clearAllMocks();
		expect(authFirebaseServiceMock).toBeDefined();

		TestBed.configureTestingModule({
			providers: [
				{
					provide: AuthFirebaseService,
					useValue: authFirebaseServiceMock,
				},
			],
		});

		service = TestBed.inject(AuthService);
	});

	test("should be created", () => {
		expect(service).toBeTruthy();
	});

	describe("signUp()", () => {
		test('should return "success" when creating user and updating username was succesfull', (done: jest.DoneCallback) => {
			authFirebaseServiceMock.createUserWithEmailAndPassword.mockReturnValueOnce(
				of(fakeReturnData.userCredential),
			);
			authFirebaseServiceMock.updateProfile.mockReturnValueOnce(
				of({ void: 0 }),
			);

			service
				.signUp(testData.displayName, testData.email, testData.password)
				.subscribe({
					next: (result: string) => {
						expect(
							authFirebaseServiceMock.createUserWithEmailAndPassword,
						).toHaveBeenCalledWith(testData.email, testData.password);
						expect(authFirebaseServiceMock.updateProfile).toHaveBeenCalledWith(
							fakeReturnData.userCredential.user,
							fakeReturnData.userCredential.user.displayName,
						);
						expect(result).toEqual("success");
						done();
					},
					error: done.fail,
				});
		});

		test('should return "updateProfileFailed" when setting username failed', (done: jest.DoneCallback) => {
			authFirebaseServiceMock.createUserWithEmailAndPassword.mockReturnValueOnce(
				of(fakeReturnData.userCredential),
			);
			authFirebaseServiceMock.updateProfile.mockReturnValueOnce(
				throwError(() => new Error("update profile failed")),
			);

			service
				.signUp(testData.displayName, testData.email, testData.password)
				.subscribe({
					next: (result: string) => {
						expect(
							authFirebaseServiceMock.createUserWithEmailAndPassword,
						).toHaveBeenCalledWith(testData.email, testData.password);
						expect(authFirebaseServiceMock.updateProfile).toHaveBeenCalledWith(
							fakeReturnData.userCredential.user,
							fakeReturnData.userCredential.user.displayName,
						);
						expect(result).toEqual("updateProfileFailed");
						done();
					},
					error: done.fail,
				});
		});

		test('should return "createUserWithEmailAndPasswordFailed" when user could not be created', (done: jest.DoneCallback) => {
			authFirebaseServiceMock.createUserWithEmailAndPassword.mockReturnValueOnce(
				of({}),
			);

			service
				.signUp(testData.displayName, testData.email, testData.password)
				.subscribe({
					next: (result: string) => {
						expect(
							authFirebaseServiceMock.createUserWithEmailAndPassword,
						).toHaveBeenCalledWith(testData.email, testData.password);
						expect(
							authFirebaseServiceMock.updateProfile,
						).not.toHaveBeenCalledWith(
							fakeReturnData.userCredential.user,
							testData.displayName,
						);
						expect(result).toEqual("createUserWithEmailAndPasswordFailed");
						done();
					},
					error: done.fail,
				});
		});

		test('should return "createUserWithEmailAndPasswordFailed" when results in an error', (done: jest.DoneCallback) => {
			authFirebaseServiceMock.createUserWithEmailAndPassword.mockReturnValueOnce(
				throwError(() => new Error("Could not create user")),
			);

			service
				.signUp(testData.displayName, testData.email, testData.password)
				.subscribe({
					next: (result: string) => {
						expect(
							authFirebaseServiceMock.createUserWithEmailAndPassword,
						).toHaveBeenCalledWith(testData.email, testData.password);
						expect(
							authFirebaseServiceMock.updateProfile,
						).not.toHaveBeenCalledWith(
							fakeReturnData.userCredential.user,
							testData.displayName,
						);
						expect(result).toEqual("createUserWithEmailAndPasswordFailed");
						done();
					},
					error: done.fail,
				});
		});
	});

	describe("signIn()", () => {
		test("should return a user when sign in successful", (done: jest.DoneCallback) => {
			authFirebaseServiceMock.signIn.mockReturnValueOnce(
				of(fakeReturnData.userCredential),
			);

			service.signIn(testData.email, testData.password).subscribe({
				next: (user) => {
					expect(user).toEqual(fakeReturnData.userCredential);
					done();
				},
				error: done.fail,
			});
		});

		test("should return a error when sign in unsuccessful", (done: jest.DoneCallback) => {
			authFirebaseServiceMock.signIn.mockReturnValueOnce(
				throwError(() => new Error("sign in failed!")),
			);

			service.signIn(testData.email, testData.password).subscribe({
				next: () => done.fail(),
				error: (e) => {
					expect(e.message).toEqual("sign in failed!");
					done();
				},
			});
		});
	});

	describe("googleSignIn()", () => {
		beforeEach(() => {
			authFirebaseServiceMock.getAuth.mockReturnValueOnce(
				authFirebaseServiceMock.auth,
			);
		});

		test("should handle succesful sign in through popup", (done: jest.DoneCallback) => {
			const credentialFromResultSpy = jest
				.spyOn(GoogleAuthProvider, "credentialFromResult")
				.mockReturnValueOnce(fakeReturnData.oauthCredential);

			authFirebaseServiceMock.signInWithPopup.mockReturnValueOnce(
				of(fakeReturnData.userCredential),
			);

			service.googleSignIn().subscribe({
				next: (result) => {
					expect(authFirebaseServiceMock.getAuth).toHaveReturnedWith(
						authFirebaseServiceMock.auth,
					);
					expect(authFirebaseServiceMock.signInWithPopup).toHaveBeenCalledWith(
						authFirebaseServiceMock.auth,
						expect.anything(),
					);
					expect(credentialFromResultSpy).toHaveBeenCalled();
					expect(result).toEqual(fakeReturnData.oauthCredential);
					done();
				},
				error: done.fail,
			});
		});

		test("should handle unsuccessful sign in through popup", (done: jest.DoneCallback) => {
			const credentialFromErrorSpy = jest
				.spyOn(GoogleAuthProvider, "credentialFromError")
				.mockReturnValueOnce(fakeReturnData.oauthCredential);

			authFirebaseServiceMock.signInWithPopup.mockReturnValueOnce(
				throwError(() => new Error("Could not sign in with popup")),
			);

			service.googleSignIn().subscribe({
				next: (result) => {
					expect(authFirebaseServiceMock.getAuth).toHaveReturnedWith(
						authFirebaseServiceMock.auth,
					);
					expect(authFirebaseServiceMock.signInWithPopup).toHaveBeenCalledWith(
						authFirebaseServiceMock.auth,
						expect.anything(),
					);
					expect(credentialFromErrorSpy).toHaveBeenCalled();
					expect(result).toEqual(fakeReturnData.oauthCredential);
					done();
				},
				error: done.fail,
			});
		});
	});
});
