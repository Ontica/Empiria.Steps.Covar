/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import { Component, Input }  from '@angular/core';

import { ProjectRef } from '../data-types/project';
import { ActivityRef } from '../data-types/activity';
import { ActivityFilter } from '../data-types/activity-filter';

import { ActivityService } from '../services/activity.service';

@Component ({
  selector: 'project-explorer',
  templateUrl: './project-explorer.component.html',
  styleUrls: ['./project-explorer.component.scss'],
  providers: [ActivityService]
})

export class ProjectExplorerComponent {

  public isTaskEditorVisible = false;
  public isVisibleProcedureInfo = false;
  public taskList: ActivityRef[] = [];//any = [];
  public selectedTask:any;
  public procedureUID: string = '';
  public expanOrCollapseIcon = 'fa fa-minus-circle';
  public projectUID: string = '';
  public isDrag = false;

  public dragIndex = 0;

  private _project: ProjectRef;

   private _refresh: boolean;
   @Input()
    set refresh(refresh: boolean) {
      if (refresh) {
        this.refreshData();
      }
      this._refresh = refresh;
    }

    private _filter: ActivityFilter;
    @Input() 
    set filter(filter: ActivityFilter) {
      this._filter = filter;   
      
      this.projectUID = filter.project;
      
      this.refreshData();
    }
    get filter(): ActivityFilter {
      return this._filter;
    }


  constructor (private activitiyService: ActivityService) { }

  public onCloseTaskEditorWindow(): void {
    this.isTaskEditorVisible = false;    
  }

  public onClickAddActivity():void {
    alert("Esta operación se encuentra en desarrollo...");

  }

  public onShowTaskEditor(selectedTask: any): void {
    this.selectedTask = selectedTask;
    this.isTaskEditorVisible = true;
  }

  public setSummaryCSSClass(level: number) : string {
    switch (level) {
      case -1:
        return 'no-summary';

      case 1:
        return 'summary-level1';

      case 2:
        return 'summary-level2';

      case 3:
        return 'summary-level3';

      default:
        return 'summary-level3';
    }

  }

  public onShowProcedureInfo(procedureUID: string): void {
    this.procedureUID = procedureUID;
    this.isVisibleProcedureInfo = true;
  }

  public onCloseProcedureInfoWindow(): void {
    this.isVisibleProcedureInfo = false;
  }

  public onUpdateActivity(activity: ActivityRef): void {
     let index = this.taskList.findIndex(x => x.uid === activity.uid);
     this.taskList[index] = activity;
   }

  public expandOrCollapse(parentUID: string): void {
   let index = this.taskList.findIndex((e) => e.parent.uid === parentUID) - 1;

   if (this.taskList[index].visible === 'collapse') {
    this.taskList[index].visible = 'expand';
    this.changeExpandOrCollapseIcon('visible');
    this.changeVisibility(parentUID, 'visible')
   } else {
    this.taskList[index].visible = 'collapse';
    this.changeExpandOrCollapseIcon('collapse');
    this.changeVisibility(parentUID, 'none');
   }

  }

  private changeExpandOrCollapseIcon(changeVisibility: string) {
    if (changeVisibility === 'collapse') {
      this.expanOrCollapseIcon = 'fa fa-plus-circle';
    } else {
      this.expanOrCollapseIcon = 'fa fa-minus-circle';
    }
  }

  private changeVisibility(parentUID, visibibility: string): void {
    this.taskList.forEach((e)=>{
      if (e.parent.uid === parentUID) {
        if (e.type === 'ObjectType.ProjectObject.Summary') {
          this.changeVisibility(e.uid, visibibility);
        }
        e.visible = visibibility;
      }
    });
  }

  private getTaskName(task) {
    return task.name;
  }

  private async refreshData() {
    await this.activitiyService.getActivities(this.projectUID)
     .then((data) => {
       this.taskList = data;
       this.taskList.forEach(function(e) { if (e.type ==='ObjectType.ProjectObject.Summary'){ e.visible = 'collapse'} else {e.visible ='none'} });
     });
  }

  public allowDrop(ev: any): void {
    if (!this.isDrag) {
      return;
    }
    ev.preventDefault();
  }

  public drag(ev:any, data: any): void { 
    ev.dataTransfer.setData("data", JSON.stringify(data));    
  }

  public drop(ev:any, task:any): void {  
    ev.preventDefault();
    this.isDrag = false;

    var data = ev.dataTransfer.getData("data"); 
    
    this.move(JSON.parse(data), task);      
  }

  public enableDrag(): void {
    this.isDrag = true;    
  }

  private move(source: any, target:any): void {
    let sourceIndex = this.taskList.findIndex((x) => x.uid === source.uid);
    this.taskList.splice(sourceIndex,1);

    source.parent.id = target.parent.id;

    let targetIndex = this.taskList.findIndex((x) => x.uid === target.uid); 
    this.taskList.splice(targetIndex,0,source);  
    
    this.dragIndex = targetIndex;
    this.moveItem(source.id, targetIndex);
  }

  private moveItem(sourceId: number, index:number): void {
    let childs = this.taskList.filter((x) => x.parent.id === sourceId);
   
    childs.forEach((child)=> {            
      let childIndex = this.taskList.findIndex((x) => x.id === child.id);     
      
      if (this.dragIndex < childIndex) {
        this.dragIndex++; 
      }

      this.taskList.splice(childIndex, 1);
      this.taskList.splice(this.dragIndex,0,child);      
      
      this.moveItem(child.id,this.dragIndex);
    } );
  }

}
