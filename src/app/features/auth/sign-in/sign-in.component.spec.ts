import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { AuthService } from "../auth.service";
import { SignInComponent } from "./sign-in.component";
import { ActivatedRoute } from "@angular/router";

describe("SignInComponent", () => {
	let component: SignInComponent;
	let fixture: ComponentFixture<SignInComponent>;
	const authServiceMock = { signIn: jest.fn().mockReturnValue(of({})) };


	// const htmlElements = {
	// 	googleSignInButton: () =>
	// 		(fixture.debugElement.nativeElement as HTMLElement).querySelector(
	// 			"#googleSignInButton",
	// 		) as HTMLButtonElement,
	// 	clickGoogleSignInButton: () => {
	// 		(
	// 			(fixture.nativeElement as HTMLElement).querySelector(
	// 				"#googleSignInButton",
	// 			) as HTMLButtonElement
	// 		).click();
	// 		fixture.detectChanges();
	// 	},
	// };

	beforeEach(async () => {
		jest.clearAllMocks();

		await TestBed.configureTestingModule({
			imports: [SignInComponent],
			providers: [{provide:ActivatedRoute,useValue:jest.fn()},{ provide: AuthService, useValue: authServiceMock }],
		}).compileComponents();

		fixture = TestBed.createComponent(SignInComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	test("should create", () => {
		expect(component).toBeTruthy();
	});
});
