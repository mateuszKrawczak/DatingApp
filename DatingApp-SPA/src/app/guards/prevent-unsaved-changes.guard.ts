import { MemberEditComponent } from './../components/members/member-edit/member-edit.component';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PreventUnsavedChangesGuard implements CanDeactivate<MemberEditComponent> {
  canDeactivate(component: MemberEditComponent) {
      if(component.editForm.dirty){
          return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
      }
      return true;
  }
}
