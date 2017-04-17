import { Directive, OnInit, Input, Injectable } from '@angular/core';
import { AppComponent } from "app/app.component";

@Directive({
    selector: "[ngLoaded]"
})

export class NgLoaded implements OnInit {
    @Input() ngLoaded: any;
    @Input() isElementAdded: boolean;
    appComponent: AppComponent;
    
    constructor(parent: AppComponent){
        this.appComponent = parent
    }

    ngOnInit() {
        if (this.ngLoaded) { this.appComponent.IsElementAdded = true; this.ngLoaded(); }
    }
}