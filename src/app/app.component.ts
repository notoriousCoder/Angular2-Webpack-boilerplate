import { Component } from '@angular/core';

@Component(
{
  selector: 'app',
  template: '<h2>{{title}}</h2><img src="/assets/images/marker.png">'
})

export class AppComponent
{
  title = 'Hello World!';
}