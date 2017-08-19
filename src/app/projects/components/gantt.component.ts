import { Component, ElementRef, Input, OnChanges, ViewChild } from "@angular/core";

import "dhtmlx-gantt";
import { } from "@types/dhtmlxgantt";

import { ProjectService } from '../services/project.service';
import { ProjectRef } from '../data-types/project';

@Component({
  selector: "gantt",
  styles: [
    `
        :host{
            display: block;
            height: 600px;
            position: relative;
            width: 100%;
        }
    `],
  template: `<div #gantt_here style='width: 100%; height: 100%;'></div>
                <div *ngIf="isActivityAddEditorWindowVisible" class="popup">
                  <!--<project-editor [project]="project" [parentId]="parentId" [activityId]="activityId" (onCloseEvent)="onCloseActivityEditorWindow()"></project-editor>-->
                  <activity-add [project]=" project " (onCloseEvent)="onCloseActivityAddEditorWindow()"></activity-add>
                </div>
                <div *ngIf="isActivityEditorWindowVisible" class="popup">                
                  <activity-editor [project]="project" [activityId]="activityId" (onCloseEvent)="onCloseActivityEditorWindow()">
                  </activity-editor>                
                </div>
                `,
  providers: [ProjectService]
})

export class GanttComponent implements OnChanges {
  @ViewChild("gantt_here") ganttContainer: ElementRef;

  @Input() public project: ProjectRef;
  @Input() public config: string;

  public isActivityAddEditorWindowVisible = false;
  public isActivityEditorWindowVisible = false;
  public isStartActivityEditorWindowVisible = false;
  public parentId: number = -1;
  public activityId: number = -1;

  constructor(private projectService: ProjectService) { }

  ngOnChanges() {

    this.initConfig();

    gantt.init(this.ganttContainer.nativeElement);

    this.attachEvents();

    this.refreshData();
  }

  public onCloseActivityAddEditorWindow(): void {
    this.isActivityAddEditorWindowVisible = false;
    this.refreshData();
  }

  public onCloseActivityEditorWindow(): void {
    this.isActivityEditorWindowVisible = false;
    this.refreshData();
  }


  // Private methods

  private attachEvents() {
    gantt.attachEvent("onTaskCreated", (id, item) => {
      this.parentId = id.parent || -1;
      this.activityId = -1;

      this.isActivityAddEditorWindowVisible = true;
    });

    gantt.attachEvent("onTaskDblClick", (id, item) => {
      this.activityId = id;

      this.isActivityEditorWindowVisible = true;
    });

    gantt.attachEvent("onAfterTaskDrag", function (id, mode, e) {
      let modes = gantt.config.drag_mode;    
      if (mode === modes.resize) {
        alert("movio la tarea" + id);
           var modifiedTask = gantt.getTask(id);
       
        alert("fecha de inicio: " + modifiedTask.start_date);        
        alert("Fecha de termino: " + modifiedTask.end_date);
        
        
      }

    });

  }

  private initConfig() {
    gantt.config.xml_date = "%Y-%m-%d %H:%i";
    gantt.config.grid_resize = true;
    gantt.config.keep_grid_width = false;
    gantt.config.smart_rendering = true;
    gantt.config.show_progress = true;
    gantt.config.drag_progress = false;
    gantt.config.open_tree_initially = true;

    this.setScaleUnit();
  }

  private setScaleUnit() {
    switch (this.config) {
      case 'ganttWeeks':
        gantt.config.scale_unit = 'week';
        return;
      case 'ganttMonths':
        gantt.config.scale_unit = 'month';
        return;
      case 'ganttQuarters':
        gantt.config.scale_unit = 'quarter';
        return;
      default:
        gantt.config.scale_unit = 'month';
        return;
    }
  }

  private refreshData() {
    this.projectService.getTasksList(this.project.uid)
      .then((data) => {
        gantt.clearAll();
        gantt.parse({ data });
      });
  }

}
