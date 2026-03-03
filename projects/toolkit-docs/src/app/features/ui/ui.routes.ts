import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'button',
        loadComponent: () => import("./views/button/button").then(c => c.Button),
    },
    {
        path: '**',
        redirectTo: 'button',
    },
];
