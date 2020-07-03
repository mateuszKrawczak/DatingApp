import { AuthGuard } from './guards/auth.guard';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ListsComponent } from './components/lists/lists.component';
import { MemberListComponent } from './components/member-list/member-list.component';
export const appRoutes: Routes = [
    { path: '', component:HomeComponent},
    {
        path:"",
        runGuardsAndResolvers:'always',
        canActivate: [AuthGuard],
        children:[
            { path: 'members', component:MemberListComponent},
            { path: 'lists', component:ListsComponent},
            { path: 'messages', component:MessagesComponent},
        ]
    },
    
    { path: '**', redirectTo: '', pathMatch:'full'},
];
