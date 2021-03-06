/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { ProjectFilesService } from '@app/data-services/project-management';

import { ProjectItemFile, Project } from '@app/models/project-management';


@Injectable()
export class FileStore {

  private _files: BehaviorSubject<ProjectItemFile[]> = new BehaviorSubject([]);

  constructor(private filesService: ProjectFilesService) {
    this.loadInitialData();
  }


  allFiles(): Observable<ProjectItemFile[]> {
    return this._files.asObservable();
  }


  projectFiles(project: Project): Observable<ProjectItemFile[]> {
    return of(this._files.value.filter(x => x.projectItem.project.uid === project.uid));
  }


  refreshAllFiles() {
    this.loadAllFiles();
  }


  // private methods


  private loadInitialData() {
    this.loadAllFiles();
  }


  private loadAllFiles() {
    this.filesService.getAllFiles()
        .subscribe(
            data => {
              data = data.sort((x, y) => x.mediaFile.name.localeCompare(y.mediaFile.name));
              this._files.next(data);
            },
            err => console.log('Error reading project data', err)
        );
  }

}
