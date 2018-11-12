/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'emp-ng-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  keywords = '';
  layoutType: string;

  constructor(route: ActivatedRoute, private router: Router) {
    this.layoutType = route.snapshot.data['layoutType'];
  }

  onAction(event: any) {

  }


  search(keywords: string) {
    if (keywords) {
      this.router.navigate(['/search/main', { keywords: keywords } ]);
    }
  }

}
