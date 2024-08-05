import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SignInComponent } from "./sign-in.component";
import { AuthService } from "../auth.service";
import { of } from "rxjs";

describe("SignInComponent", () => {
	let component: SignInComponent;
	let fixture: ComponentFixture<SignInComponent>;
	const authServiceMock = { signIn: jest.fn().mockReturnValue(of({})) };

	const testData = {
		email: "username123@test.com",
		password: "username123@",
	};

	const htmlElements = {
		emailInput: () =>
			(fixture.nativeElement as HTMLElement).querySelector(
				"#emailInput",
			) as HTMLInputElement,
		emailError: () =>
			(fixture.debugElement.nativeElement as HTMLElement).querySelector(
				"#emailError",
			),
		passwordInput: () =>
			(fixture.nativeElement as HTMLElement).querySelector(
				"#passwordInput",
			) as HTMLInputElement,
		passwordError: () =>
			(fixture.debugElement.nativeElement as HTMLElement).querySelector(
				"#passwordError",
			),
		clickSubmitButton: () => {
			(
				(fixture.nativeElement as HTMLElement).querySelector(
					"#submitButton",
				) as HTMLButtonElement
			).click();
			fixture.detectChanges();
		},
		setInput: (htmlInputElement: HTMLInputElement, value: string) => {
			htmlInputElement.value = value;
			htmlInputElement.dispatchEvent(new Event("input", { bubbles: true }));
		},
	};

	beforeEach(async () => {
		jest.clearAllMocks();

		await TestBed.configureTestingModule({
			imports: [SignInComponent],
			providers: [{ provide: AuthService, useValue: authServiceMock }],
		}).compileComponents();

		fixture = TestBed.createComponent(SignInComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	test("temp test", () => {
		expect(true).toBe(true);
	});

	test("should create", () => {
		expect(component).toBeTruthy();

		expect(htmlElements.emailError()).toBeNull();
		expect(htmlElements.passwordError()).toBeNull();
	});

	describe("submit form", () => {
		test("should request to register through firebase when submitted form is valid", () => {
			htmlElements.setInput(htmlElements.emailInput(), testData.email);
			htmlElements.setInput(htmlElements.passwordInput(), testData.password);

			htmlElements.clickSubmitButton();

			// expect(authServiceMock.signUp).toHaveBeenCalledWith(testData.username, testData.email, testData.password);
		});

		test("should not request to register through firebase when submitted form is empty", () => {
			expect(component.signInForm.value).toEqual({ email: "", password: "" });
			htmlElements.clickSubmitButton();
			fixture.detectChanges();

			expect(htmlElements.emailError()).not.toBeNull();
			expect(htmlElements.passwordError()).not.toBeNull();
			// expect(authServiceMock.signUp).not.toHaveBeenCalled();
		});

		test("should not request to register through firebase when submitted form contains empty email", () => {
			htmlElements.setInput(htmlElements.passwordInput(), testData.password);

			htmlElements.clickSubmitButton();

			expect(htmlElements.emailError()).not.toBeNull();
			expect(htmlElements.passwordError()).toBeNull();
			// expect(authServiceMock.signUp).not.toHaveBeenCalled();
		});

		test("should not request to register through firebase when submitted form contains empty password", () => {
			htmlElements.setInput(htmlElements.emailInput(), testData.email);

			htmlElements.clickSubmitButton();

			expect(htmlElements.emailError()).toBeNull();
			expect(htmlElements.passwordError()).not.toBeNull();
			// expect(authServiceMock.signUp).not.toHaveBeenCalled();
		});
	});
});
