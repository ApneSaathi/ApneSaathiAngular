import { Injectable } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  /**
   * loginUser get function is to fetch the loginUser local storage item
   */
  get loginUser(){
    return this.getAppLocalStorage('loginUser');
  }
  /**
   * revealKey get function is to fetch key to be validated for login
   */
  get revealKey(){
    let loginName=this.getAppLocalStorage('loginName');
    let loginId=this.getAppLocalStorage('loginId');
    if(loginName!='' && typeof loginName != 'undefined' && loginId!='' && loginId != 'undefined'){
      return btoa(loginId+loginName);
    }
    else{
      return '';
    }
    
  }
  /**
   * validateLogin function is to check user login validation 
   */
  validateLogin(){
    if(this.loginUser && this.loginUser!='' && typeof this.loginUser !='undefined'){
      if(this.loginUser.reveal_key && this.loginUser.reveal_key!='' && typeof this.loginUser.reveal_key !='undefined'){
        if(this.loginUser.reveal_key==this.revealKey){
          return true;
        }
        else{
          return false;
        }
      }
      return false;
    }
    return false;
  }
  /**
   * setAppLocalstorage function is to set any  local storage item dynamically of apnesaathi application
   * @param key 
   * @param data 
   */
  setAppLocalstorage(key,data){
    let dataType=typeof data ; 
    if(typeof data == 'object'){
      data=JSON.stringify(data);
    }else{
      data=data;
    }
    let setData={data,type:dataType};
    console.log("Set Data:",setData);
    localStorage.setItem(key,JSON.stringify(setData));
  }
  /**
   * getAppLocalStorage function is to get any  local storage item dynamically of apnesaathi application
   */
  getAppLocalStorage(key){
    let localData;
    localData=localStorage.getItem(key);
    console.log("Get Data:",localData);
    if(localData && localData!='' && typeof localData != 'undefined'){
      localData=JSON.parse(localData);
      let getData=localData.data;
      if(localData.type == 'object'){
        getData=JSON.parse(getData);
      }  
      return getData;
    }
    else
      return '';
  }
  /**
   * removeAppLocalStorage function is to remove any local storage item dynamically of ApneSaathi App
   * @param key 
   */
  removeAppLocalStorage(key){
    localStorage.removeItem(key);
    return true;
  }
}
