import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { ApiInfoService } from '../services/api-info.service';
import { SharedService } from '../services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationMessageComponent } from '../notification-message/notification-message.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public base_url;
  public returnUrl: string;
  public loginForm:FormGroup=this.fb.group({
    userName:['',[Validators.required, Validators.minLength(4), Validators.maxLength(50)]], //Validators.minLength(4)
    password: ['',[Validators.required]]
  });
  constructor(
    private fb:FormBuilder, 
    private api_info: ApiInfoService, 
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService,
    private snackBar: MatSnackBar
    ) { }
  ngOnInit(): void {
    this.base_url=environment.base_url;
    if(this.sharedService.validateLogin()){
      this.router.navigate(['/volunteers']);
    }
  }
  login(){
    //console.log(this.loginForm);
    
    //dynamicPostRequest funcion invoke to get the sr CItizen list from API
    let paramsObj={
      url:"http://15.207.42.209:8080/Volunteer/verifyAdmin",
      postData:this.loginForm.value
    };
    console.log("Login Params:",paramsObj);
    this.api_info.dynamicPostRequest(paramsObj).subscribe(response=>{
      //setting local storage after successful login
      if(response.message=='Success'){
        this.sharedService.setAppLocalstorage('loginId', response.adminDomain.adminId);
        this.sharedService.setAppLocalstorage('loginName', response.adminDomain.firstName);
        let reveal_key=btoa(response.adminDomain.adminId+response.adminDomain.firstName);
        response.adminDomain.reveal_key=reveal_key;
        this.sharedService.setAppLocalstorage('loginUser', response.adminDomain);
        // Checking if redirected from Unauthorized URL
        console.log("Local Storage URL:",this.sharedService.getAppLocalStorage('returnUrl'))
        if(this.sharedService.getAppLocalStorage('returnUrl') != ''){
          this.returnUrl =this.sharedService.getAppLocalStorage('returnUrl');
          this.sharedService.removeAppLocalStorage('returnUrl');
        }
        else{
          this.returnUrl = '/volunteers';
        }
        this.showNotification({message: "Login Successful.!",success:true});
        this.router.navigate([this.returnUrl]);
      }
      else{
        this.showNotification({message: "Invalid Credentials"});
      }
    });
  }
  showNotification(notificationData){
    this.snackBar.openFromComponent(NotificationMessageComponent,{
      data:notificationData,
      duration:2000,
      panelClass: "notification-snackbar"
    });
  }
}
