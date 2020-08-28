import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public base_url;
  activeLink;
  constructor() { }

  ngOnInit(): void {
    this.base_url=environment.base_url;
  }

  isButtonClicked(clickedLink) {
    this.activeLink=clickedLink;
  }

}
