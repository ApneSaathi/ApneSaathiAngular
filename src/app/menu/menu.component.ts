import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router, Event, Scroll } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public base_url;
  activeLink;
  public openModule:string;
  constructor(private router: Router) {
    this.router.events.subscribe((routerData: Event)=>{
      if(routerData instanceof Scroll){
        console.log("URL:",routerData.routerEvent.url)
        let UrlSegmentsArray=routerData.routerEvent.url.split('/');
        this.openModule=UrlSegmentsArray[1];
        this.activeLink=UrlSegmentsArray[UrlSegmentsArray.length-1]
      }
    });

   }

  ngOnInit(): void {
    this.base_url=environment.base_url;

  }

  isButtonClicked(clickedLink,module) {
    this.activeLink=clickedLink;
    this.openModule=module;
  }

}
