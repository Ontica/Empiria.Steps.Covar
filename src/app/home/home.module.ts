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

import { HomeRoutingModule } from './home-routing.module';

import { HomeMainPageComponent } from './main-page/home-main-page.component';

import { ContainerComponent } from './parts/container.component';
import { BinnaclePartComponent } from './parts/binnacle-part.component';
import { ChatPartComponent } from './parts/chat-part.component';
import { ProjectsStatusPartComponent } from './parts/projects-status-part.component';
import { TodoListPartComponent } from './parts/todo-list-part.component';
import { NewsPartComponent } from './parts/news-part.component';
import { SearchPartComponent } from './parts/search-part.component';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [HomeRoutingModule, SharedModule, CommonModule, FormsModule],
  declarations: [HomeMainPageComponent, ContainerComponent, BinnaclePartComponent,
                 ChatPartComponent, ProjectsStatusPartComponent, TodoListPartComponent,
                 NewsPartComponent, SearchPartComponent],
  exports: [HomeMainPageComponent]
})
export class HomeModule { }
