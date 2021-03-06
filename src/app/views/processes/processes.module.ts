/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AngularMaterialModule } from '@app/shared/angular-material.module';
import { SharedModule } from '@app/shared/shared.module';

import { DataObjectsModule } from '@app/views/data-objects/data-objects.module';
import { KnowledgeBaseModule } from '@app/views/knowledge-base/knowledge-base.module';
import { ProceduresModule } from '@app/views/procedures/procedures.module';

import { RequirementEditorComponent } from './requirements/requirement-editor.component';
import { RequirementsListComponent } from './requirements/requirements-list.component';

import { ExportProcessesDialogComponent } from './export-processes-dialog/export-processes-dialog.component';
import { ProcessesMainPageComponent } from './main-page/processes-main-page.component';
import { ProcessTreeDesignerComponent } from './tree-designer/tree-designer.component';
import { ProcessDiagramEditorComponent } from './activity-designer/diagram-editor/diagram-editor.component';
import { ActivityDesignerComponent } from './activity-designer/activity-designer.component';
import { StepDataConfigurationComponent } from './step-data-configuration/step-data-configuration.component';
import { MoveActivityDialogComponent } from './move-activity-dialog/move-activity-dialog.component';
import { BpmnModelerComponent } from './activity-designer/diagram-editor/bpmn-modeler/bpmn-modeler.component';

import {
 ActivityModelFormComponent
} from './activity-designer/activity-model-form/activity-model-form.component';


import { ProcessesRoutingModule } from './processes-routing.module';



@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,

    AngularMaterialModule,
    SharedModule,

    DataObjectsModule,
    KnowledgeBaseModule,

    ProceduresModule,

    ProcessesRoutingModule
  ],

  declarations: [
    ActivityDesignerComponent,
    ActivityModelFormComponent,
    MoveActivityDialogComponent,
    ProcessesMainPageComponent,
    ProcessTreeDesignerComponent,
    ProcessDiagramEditorComponent,
    RequirementEditorComponent,
    RequirementsListComponent,
    StepDataConfigurationComponent,
    ExportProcessesDialogComponent,
    BpmnModelerComponent
  ],

  exports: [
    ActivityDesignerComponent,
    RequirementEditorComponent
  ],

  entryComponents: [
    MoveActivityDialogComponent
  ]

})
export class ProcessesModule { }
