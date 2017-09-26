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
import { ProjectsModule } from '../Projects/projects.module';

import { ProjectManagerLayoutComponent } from '../project-manager/main-page/project-manager-layout.component';

import { ProjectManagerRoutingModule } from './project-manager-routing.module';
import { KanbanComponent } from './kanban/kanban.component';
import { KanbanTaskBoxComponent } from './kanban/kanban-task-box.component';

import { TreeViewProjectsComponent } from './editor/tree-view-projects.component';
import { TreeViewResponsiblesComponent} from './editor/tree-view-responsibles.component';

import { TaskListViewComponent } from './editor/tasks-list-view/task-list-view.component';
import { GanttViewComponent } from './editor/gantt-view/gantt-view.component';
/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [ProjectManagerRoutingModule, SharedModule, CommonModule, FormsModule, ProjectsModule],
  declarations: [ProjectManagerLayoutComponent, KanbanComponent, KanbanTaskBoxComponent,
                TreeViewProjectsComponent, TreeViewResponsiblesComponent,
                TaskListViewComponent, GanttViewComponent],
  exports: [ProjectManagerLayoutComponent]
})
export class ProjectManagerModule { }