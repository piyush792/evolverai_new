import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalVariableService } from '../services/common/global-variable.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isLightTheme = true;
  result: any;
  error = "false";
  errorMessage = "";
  userName: any = '';

  exclusive: boolean = false;

  constructor(private router: Router, private _activatedRoute: ActivatedRoute, private usersService: UserService, private globalVariableService: GlobalVariableService) {

    this.usersService.exclusive.subscribe(res => {
      this.exclusive = res;
      console.log("exclusive22: ", res);
    });

    this.result = JSON.parse(sessionStorage.getItem('currentUser') || "null");

    // if (this.userService.isLoggednIn() == false) {
    //   this.autologout();
    // }
    // if (this.result !== null) {
    // }
    // else {
    //   this.error = "true";
    //   this.errorMessage = "Your session is expired..";
    //   this.router.navigate(['login'], { queryParams: { error: this.error, errorMessage: this.errorMessage } }); // when user is not logged in app is redirected to login page 
    // }

  }

  ngOnInit(): void {



    var sessVal = sessionStorage.getItem('currentUser');
    this.userName = JSON.parse(sessionStorage.getItem('currentUser') || "null");
    if (sessVal == null) {
      this.router.navigate(['login']);
    }
  }

  onThemeSwitchChange() {
    this.isLightTheme = !this.isLightTheme;
    this.globalVariableService.setSelectedThemes(this.isLightTheme);

    document.body.setAttribute(
      'data-theme',
      this.isLightTheme ? 'light' : 'dark'
    );
  }

  autologout() {
    setTimeout(() => {
      this.error = "true";
      this.errorMessage = "Your session is expired..";
      sessionStorage.removeItem('currentUser');
      // localStorage.removeItem('id_token');
      // localStorage.removeItem('expires_at');
      this.router.navigate(['login'], { queryParams: { error: this.error, errorMessage: this.errorMessage } }); // when user is not logged in app is redirected to login page 
    }, 1000);
  }

  openNewTabMyDashboard() {
    // Converts the route into a string that can be used 
    // with the window.open() function
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/user-dashboard`])
    );
    window.open(url, '_blank');
  }

  openNewTabMyDownloadFiles() {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/article-sentence-dashboard`])
    );
    window.open(url, '_blank');
  }
}
