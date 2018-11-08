/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from '@app/shared/angular-material.module';

import { SharedModule } from '../shared/shared.module';

import { ProceduresModule } from '@app/procedures/procedures.module';
import { ControlsModule } from '@app/controls/controls.module';
import { KnowledgeBaseModule } from '@app/knowledge-base/knowledge-base.module';

import { ActivityTreeComponent } from './activity-tree/activity-tree.component';
import { ActivityInlineEditorComponent } from './activity-tree/activity-inline-editor.component';

import { ActivityTimelineComponent } from './activity-timeline/activity-timeline.component';
import { GroupActivitiesByPipe } from './activity-timeline/group-activities-by.pipe';

import { ActivityEditorComponent } from './activity-editor/activity-editor.component';
import { ActivityFormComponent } from './activity-editor/activity-form/activity-form.component';

import { ActivityDesignerComponent } from './activity-designer/activity-designer.component';
import { ActivityModelFormComponent } from './activity-designer/activity-model-form/activity-model-form.component';


import { AddEventDialogComponent } from './add-event-dialog/add-event-dialog.component';
import { MoveActivityDialogComponent } from './move-activity-dialog/move-activity-dialog.component';

import { ProjectManagementRoutingModule } from './project-management-routing.module';

import { ProjectsMainPageComponent } from './main-page/projects-main-page.component';
import { TemplatesMainPageComponent } from './templates/templates-main-page.component';

import { DhtmlxGanttComponent } from './dhtmlx-gantt/dhtmlx-gantt.component';
import { ActivityTasksComponent } from './activity-tasks/activity-tasks.component';


@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,

    ControlsModule,
    SharedModule,
    ProceduresModule,
    KnowledgeBaseModule,

    ProjectManagementRoutingModule
  ],


  declarations: [

    ActivityDesignerComponent,
    ActivityModelFormComponent,

    ActivityEditorComponent,
    ActivityFormComponent,
    ActivityInlineEditorComponent,
    ActivityTreeComponent,


    ActivityTimelineComponent,
    GroupActivitiesByPipe,

    AddEventDialogComponent,
    MoveActivityDialogComponent,

    ProjectsMainPageComponent,
    TemplatesMainPageComponent,

    DhtmlxGanttComponent,

    ActivityTasksComponent,
  ],

  exports: [
    DhtmlxGanttComponent,
    ProjectsMainPageComponent,
    TemplatesMainPageComponent
  ],

  entryComponents: [
    AddEventDialogComponent,
    MoveActivityDialogComponent
  ]

})
export class ProjectManagementModule { }
