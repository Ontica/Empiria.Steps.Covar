/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { CoreService } from '@app/core/core.service';

import { Process } from '@app/models/regulation';


@Injectable()
export class ProcessService {

  public constructor(private core: CoreService) { }

  public getProcesses(): Promise<Process[]> {
    return this.core.http.get<Process[]>('v1/process-definitions')
                         .toPromise();
  }

  public getProcessDiagram(uid: string): Promise<Process> {
    return this.core.http.get<Process>('v1/process-definitions/' + uid)
                         .toPromise();
  }

  public saveDiagramChanges(process: Process): Promise<Process> {
    const body = {
      xml: process.xml
    };

    return this.core.http.put<Process>('v1/process-definitions/' + process.uid, body)
                         .toPromise();
  }

  public saveNewDiagram(process: Process): Promise<Process> {
    const body = {
      name: process.name,
      version: process.version,
      xml: process.xml
    };

    return this.core.http.post<Process>('v1/process-definitions', body)
                         .toPromise();
  }

}