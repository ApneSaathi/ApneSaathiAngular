import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, Scroll } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ApneSaathiAngular';
  isLoginUrl:boolean=false;
  constructor(private router: Router){
    
  }
  ngOnInit():void {
    /* Observing route to hide menu and header for login component */
    this.router.events.subscribe((routerData: Event)=>{
      console.log("Router Event:",routerData)
      if(routerData instanceof Scroll){
        console.log("URL:",routerData.routerEvent.url)
        this.isLoginUrl=routerData.routerEvent.url == "/login"?true:false;
      }
    });
  }

}
