import { TestBed } from "@angular/core/testing";
import { AuthService } from "./auth.service";
import { AuthFirebaseService } from "./auth-firebase.service";
import { UserCredential } from "@angular/fire/auth";
import { of, throwError } from "rxjs";

describe("AuthService", () => {
	let service: AuthService;

	const authFirebaseServiceMock = {
		createUserWithEmailAndPassword: jest.fn(),
		updateProfile: jest.fn(),
		signIn: jest.fn(),
	};

	const testData = {
		displayName: "Harry Potter",
		email: "harrypotter@hogwarts.com",
		password: "HP31081980",
	};

	const fakeReturnData = {
		userCredential: {
			user: {
				displayName: testData.displayName,
				email: testData.email,
			},
		} as UserCredential,
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
});
