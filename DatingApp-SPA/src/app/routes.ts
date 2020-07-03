import { AuthGuard } from './guards/auth.guard';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ListsComponent } from './components/lists/lists.component';
import { MemberListComponent } from './components/members/member-list/member-list.component';
import { MemberDetailComponent } from './components/members/member-detail/member-detail.component';
import { MemberListResolver } from './resolvers/member-list.resolver';
import { MemberDetailResolver } from './resolvers/member-detail.resolver';
export const appRoutes: Routes = [
    { path: '', component:HomeComponent},
    {
        path:"",
        runGuardsAndResolvers:'always',
        canActivate: [AuthGuard],
        children:[
            { path: 'members', component:MemberListComponent, resolve:{users:MemberListResolver}},
            { path: 'members/:id', component:MemberDetailComponent, resolve:{user:MemberDetailResolver}},
            { path: 'lists', component:ListsComponent},
            { path: 'messages', component:MessagesComponent},
        ]
    },
    
    { path: '**', redirectTo: '', pathMatch:'full'},
];
