import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { MENU } from './menu';
import { MenuItem } from './menu.model';

@Component({
  selector: 'app-horizontalnavbar',
  templateUrl: './horizontalnavbar.component.html',
  styleUrls: ['./horizontalnavbar.component.scss']
})
export class HorizontalnavbarComponent implements OnInit, AfterViewInit {

  configData;
  menuItems = [];
  permissions

  constructor(private router: Router,private auth:AuthService) {

  }

  ngOnInit(): void {

    this.initialize();
    this.permissions=this.auth.getPermissions();

    this.configData = {
      suppressScrollX: true,
      wheelSpeed: 0.3
    };
  }

  /**
   * On menu click
   */
  onMenuClick(event: any) {
    const nextEl = event.target.nextSibling;
    const parent = event.target.parentNode;
    if (nextEl.id !== 'navmenu') {
    } else if (nextEl && !nextEl.classList.contains('show')) {
      const parentEl = event.target.parentNode;
      if (parentEl) { parentEl.classList.remove('show'); }
      nextEl.classList.toggle('show');
    }
    return false;
  }

  checkPermission(item){
    if(this.permissions){
      if(item.permLabel!=undefined) return (this.permissions.hasOwnProperty(item.permLabel) ? this.permissions[item.permLabel].value : false)

      else if(item.permLabel==undefined){

        if(item.subItems!=undefined && item.subItems.length>0){

          for(var subitem of item.subItems){

            if(subitem.permLabel!=undefined){
              if(this.permissions.hasOwnProperty(subitem.permLabel) && this.permissions[subitem.permLabel].value) return true
            }
          }
          
        }
      }
    }
    return false

  }

  ngAfterViewInit() {
    // this.activateMenu();
  }

  /**
   * remove active and mm-active class
   */
  _removeAllClass(className) {
    const els = document.getElementsByClassName(className);
    while (els[0]) {
      els[0].classList.remove(className);
    }
  }

  /**
   * Togglemenu bar
   */
  toggleMenubar() {
    const element = document.getElementById('topnav-menu-content');
    element.classList.toggle('show');
  }

  /**
   * Activates the menu
   */
  private activateMenu() {

    const resetParent = (el: any) => {
      // console.log(el)
      const parent = el.parentElement;
      if (parent) {
        parent.classList.remove('active');
        const parent2 = parent.parentElement;
        this._removeAllClass('mm-active');
        this._removeAllClass('mm-show');
        if (parent2) {
          parent2.classList.remove('active');
          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove('active');
            const parent4 = parent3.parentElement;
            if (parent4) {
              parent4.classList.remove('active');
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove('active');
              }
            }
          }
        }
      }
    };

    // activate menu item based on location
    const links = document.getElementsByClassName('side-nav-link-ref');
    let matchingMenuItem = null;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < links.length; i++) {
      // reset menu
      resetParent(links[i]);
    }
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < links.length; i++) {
      // tslint:disable-next-line: no-string-literal
      if (location.pathname === links[i]['pathname']) {
        matchingMenuItem = links[i];
        break;
      }
    }

    if (matchingMenuItem) {
      const parent = matchingMenuItem.parentElement;
      /**
       * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
       * We should come up with non hard coded approach
       */
      if (parent) {
        parent.classList.add('active');
        const parent2 = parent.parentElement;
        if (parent2) {
          parent2.classList.add('active');
          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.add('active');
            const parent4 = parent3.parentElement;
            if (parent4) {
              parent4.classList.add('active');
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.add('active');
              }
            }
          }
        }
      }
    }
  }

  /**
   * Topbar light
   */
  topbarLight() {
    document.body.setAttribute('data-topbar', 'light');
    document.body.removeAttribute('data-layout-size');
  }

  /**
   * Set boxed width
   */
  boxedWidth() {
    document.body.setAttribute('data-layout-size', 'boxed');
    document.body.setAttribute('data-topbar', 'dark');
  }

  /**
   * Change the layout onclick
   * @param layout Change the layout
   */
  changeLayout(layout: string) {
    // this.eventService.broadcast('changeLayout', layout);
  }

  /**
   * Initialize
   */
  initialize(): void {
    this.menuItems = MENU;
  }

  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }

}
