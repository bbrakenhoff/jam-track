import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
	selector: "app-sign-in",
	standalone: true,
	imports: [CommonModule, RouterLink],
	templateUrl: "./sign-in.component.html",
	styleUrl: "./sign-in.component.scss",
})
export class SignInComponent {
	public constructor(private readonly authService: AuthService) {}

	public startGoogleSignIn(): void {
		this.authService.googleSignIn().subscribe({
			next: () =>
				console.log(
					// biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
					`%c🍟🍔🍕 sign-in.component.ts[ln:37] google sign in success!`,
					"color: deeppink",
				),
			// biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
			error: (e) => console.error(`%c🍟🍔🍕 sign-in.component.ts[ln:38]`, e),
		});
	}
}
