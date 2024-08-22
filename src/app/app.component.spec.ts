import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { of, Subject } from "rxjs";
import { AuthService } from "./features/auth/auth.service";
import { User } from "@angular/fire/auth";

describe("AppComponent", () => {
	const authServiceMock = {
		authState: jest.fn(),
	};

	const fakeReturnData = {
		user: {
			displayName: "Hermoine Granger",
			email: "hermoine.granger@hogwarts.com",
		},
	};

	beforeEach(async () => {
		authServiceMock.authState.mockReturnValue(of(fakeReturnData.user));

		await TestBed.configureTestingModule({
			imports: [AppComponent],
			providers: [{ provide: AuthService, useValue: authServiceMock }],
		}).compileComponents();
	});

	test("should create the app", () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
