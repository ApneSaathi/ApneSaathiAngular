import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private sharedService: SharedService,private router: Router) { }
  public base_url;
  public loginInfo;
  ngOnInit(): void {
    this.base_url=environment.base_url;
    this.loginInfo= this.sharedService.getAppLocalStorage('loginUser');
    console.log("Header Login:",this.loginInfo);
  }
  /**
   * logout funcion is to signout/logout the user from application by removing user data from local storage
   */
  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
