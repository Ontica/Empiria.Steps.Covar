/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { WorklistsMainPageComponent } from './main-page/worklists-main-page.component';

import { TaskEditorComponent } from './editor/task-editor.component';
import { TaskHistoryComponent } from './editor/tabs/task-history.component';
import { TaskControlAndStateComponent } from './editor/tabs/task-control-and-state.component';
import { TaskReferencesComponent } from './editor/tabs/task-references.component';
import { TaskDeliverablesComponent } from './editor/tabs/task-deliverables.component';

import { WorklistsRoutingModule } from './worklists-routing.module';

import { TaskFormEditorComponent } from './editor/task-form-editor.component';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [WorklistsRoutingModule, SharedModule, CommonModule, FormsModule],
  declarations: [WorklistsMainPageComponent, TaskEditorComponent, TaskHistoryComponent,
                 TaskControlAndStateComponent, TaskReferencesComponent,
                 TaskDeliverablesComponent, TaskFormEditorComponent],
  exports: [WorklistsMainPageComponent]
})
export class WorklistsModule { }
