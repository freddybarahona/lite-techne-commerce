import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteHeader } from '../site-header/site-header';
import { SiteFooter } from '../site-footer/site-footer';

@Component({
  imports: [
    RouterOutlet,
    SiteHeader,
    SiteFooter
  ],
  selector: 'app-shell.component',
  templateUrl: './shell.component.html',
})
export class ShellComponent {}
