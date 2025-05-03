import { Component, Input} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() sideNavItem!: MatSidenav;
  sidebar!: SideBarComponent;
  constructor(private router: Router , private authservice : AuthService) { }

   openSidebar() {
    this.sideNavItem.toggle();
  }

  openHome() {
    this.router.navigate(['/home']);
  }

  logout()
  {
   this.authservice.logOut()
  }

   userLogged ()
  {
    let isLogged = this.authservice.getToken()
    if (isLogged)
    {
      return true;
    }else
    {
      return false
    }
  }

}
