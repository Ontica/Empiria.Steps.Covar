/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, of } from 'rxjs';

import { FileStore } from '@app/store/file.store';
import { UserInterfaceStore } from '@app/store/ui.store';

import { ProjectItemFile, ProjectItemFilter, EmptyProjectItemFilter } from '@app/models/project-management';
import { FileToUpload } from '@app/models/knowledge-base';
import { View } from '@app/models/user-interface';
import { isEmpty } from '@app/models/core';


@Component({
  selector: 'emp-steps-project-files-main-page',
  templateUrl: './project-files-main-page.component.html',
  styleUrls: ['./project-files-main-page.component.scss']
})
export class ProjectFilesMainPageComponent implements OnInit, OnDestroy {

  currentView: View;
  displayEditor = false;

  files: Observable<ProjectItemFile[]> = of([]);

  selectedFile: ProjectItemFile;

  filter: ProjectItemFilter = EmptyProjectItemFilter;

  private subs1: Subscription;
  private subs2: Subscription;


  constructor(private fileStore: FileStore,
              private uiStore: UserInterfaceStore) { }


  ngOnInit() {
    this.subs1 = this.uiStore.currentView.subscribe(
      value => {
        this.currentView = value;
        this.loadFiles();
      }
    );

    this.subs2 = this.uiStore.getValue<ProjectItemFilter>('Sidebar.ProjectFilter').subscribe(
      value => {
        this.filter = value;
        this.loadFiles();
      }
    );
  }


  ngOnDestroy() {
    if (this.subs1) {
      this.subs1.unsubscribe();
    }
    if (this.subs2) {
      this.subs2.unsubscribe();
    }
  }


  applyKeywordsFilter(keywords: string) {
    this.filter = {...this.filter, keywords: keywords };
  }


  onEditorClose() {
    this.displayEditor = false;
  }


  onMediaFileViewerSave(file: FileToUpload) {

  }


  showEditor(file: ProjectItemFile) {
    if (file) {
      this.selectedFile = file;
      this.displayEditor = true;
    }
  }

  // private methods


  private loadFiles() {
    if (this.currentView.name === 'Project.Files' &&
               !isEmpty(this.filter.selectedProject)) {
      this.files = this.fileStore.projectFiles(this.filter.selectedProject);

    } else if (this.currentView.name === 'Projects.Files') {
      this.files = this.fileStore.allFiles();
    }
  }

}