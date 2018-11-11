/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, EventEmitter, HostBinding, Output } from '@angular/core';

@Component({
  selector: 'emp-steps-process-activity-association',
  templateUrl: './process-activity-association.component.html',
  styleUrls: ['./process-activity-association.component.scss']
})
export class ProcessActivityAssociationComponent {

  @Output() close = new EventEmitter();

  @HostBinding('style.display') private display = 'block';
  @HostBinding('style.position') private position = 'absolute';


  cancel(): void {
    this.close.emit();
  }


  private onClose(): void {
    this.close.emit();
  }

}
