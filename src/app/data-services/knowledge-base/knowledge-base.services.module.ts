/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import { PostingsService } from './postings.service';


@NgModule({

  providers: [
    PostingsService
  ],

})
export class KnowledgeBaseServicesModule { }
