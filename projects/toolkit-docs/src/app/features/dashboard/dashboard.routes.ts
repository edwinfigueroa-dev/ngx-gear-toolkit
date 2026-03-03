import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import("./views/dashboard/dashboard").then(c => c.Dashboard),
    },
    {
        path: '**',
        redirectTo: 'dashboard',
    },
];
