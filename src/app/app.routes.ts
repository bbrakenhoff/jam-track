import { Routes } from "@angular/router";
import { OverviewComponent } from "./features/overview/overview.component";

export const routes: Routes = [
	{
		path: "auth",
		loadChildren: () =>
			import("./features/auth/auth.routes").then((m) => m.routes),
	},
	{ path: "overview", component: OverviewComponent },
	{ path: "", redirectTo: "auth", pathMatch: "full" },
];
