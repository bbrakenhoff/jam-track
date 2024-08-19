import { Component } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { NavbarComponent } from "./navbar/navbar.component";
import { AuthService } from "./features/auth/auth.service";
import { User } from "@angular/fire/auth";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [RouterOutlet, NavbarComponent],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
})
export class AppComponent {
	constructor(
		private router: Router,
		private readonly authService: AuthService,
	) {
		this.authService.authState().subscribe({
			next: (user: User | null) => {
        console.log(`%c🍟🍔🍕 app.component.ts[ln:21]`, 'color: deeppink')
				if (user) {
					this.router.navigate(["overview"]);
				} else {
					this.router.navigate(["sign-in"]);
				}
			},
		});
	}
}
