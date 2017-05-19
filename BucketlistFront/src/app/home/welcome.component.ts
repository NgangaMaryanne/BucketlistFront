import { Component } from '@angular/core';

@Component({
    selector: 'bl-welcome',
    moduleId: module.id,
    templateUrl: 'welcome.component.html',
    styleUrls: ['welcome.component.css']

})

export class WelcomeComponent{
    pageTitle: string = 'Bucketlist'

}