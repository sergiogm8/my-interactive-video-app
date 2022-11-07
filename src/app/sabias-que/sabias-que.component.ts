import { NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-sabias-que',
  templateUrl: './sabias-que.component.html',
  styleUrls: ['./sabias-que.component.scss'],
})
export class SabiasQueComponent implements OnInit, OnDestroy {

  
  constructor() {
    const self = this;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    
  }

  getInnerHTML() {
    return self.document.body.innerHTML = '<h1>hola</h1>';
    
  }
}
