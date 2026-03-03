import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'number',
        loadComponent: () => import("./views/number/number").then(c => c.Number),
    },
    {
        path: '**',
        redirectTo: 'number',
    },
];
