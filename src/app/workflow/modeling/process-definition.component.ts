/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { BrowserModule, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Process } from './process';
import { ProcessDefinitionService } from './Process-definition.service';

@Component({
  selector: 'process-definition',
  templateUrl: './process-definition.component.html',
  styleUrls: ['process-definition.component.css'],
  providers: [ProcessDefinitionService]
})

export class ProcessDefinitionComponent implements OnInit {

  public url: SafeResourceUrl;
  public process: Process;
  public processes: Process[] = [];

  @ViewChild('modeler') public el: ElementRef;

  public isAcitvateSaveNewDiagramPopup = false;
  public isNewDiagram = false;
  public _editionMode: boolean;
  public saveAsLabel = 'Guardar como';

  get editionMode() {
    return this._editionMode;
  }

  set editionMode(edition: boolean) {
    if (edition) {
      this.modeler.editionMode = true;
    } else {
      this.modeler.editionMode = false;
    }
    this._editionMode = edition;
  }

  private processUID: string = '';

  public constructor(private sanitizer: DomSanitizer, private processService: ProcessDefinitionService) {
    this.load();
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('./modeler/process-modeler.html');
  }

  public ngOnInit() {
    this.setProcesses();
  }

  public createDiagram(): void {
    this.isNewDiagram = true;
    this.editionMode = true;
    this.saveAsLabel = 'Guardar';
    this.modeler.createDiagram();
    this.attachModelerEventHandler();
  }

  public editDiagram(): void {
    this.editionMode = true;
  }

  public saveNewDiagram(value: Process): void {
    this.closeSaveNewDiagramPopup();

    this.process = value;
    this.saveDiagram();
    this.editionMode = true;
  }
  public showSaveNewDiagramPopup(): void {
    this.editionMode = false;
    this.isAcitvateSaveNewDiagramPopup = true;
  }

  public closeSaveNewDiagramPopup(): void {
    this.isAcitvateSaveNewDiagramPopup = false;
    this.editionMode = true;
  }

  public saveDiagram(): void {
    let xml = this.modeler.getXML();

    this.process.bpmnXml = xml;

    this.processService.saveProcess(this.process);
  }

  public onChangeSelectedProcess(uid: string): void {
    this.processUID = uid;
  }

  public async openDiagram() {
    this.isNewDiagram = false;

    if (this.processUID === '') {
      alert('Selecciona un diagrama de la lista');
      return;
    }

    this.process = await this.processService.getProcessDiagram(this.processUID);

    this.loadXml(this.process.bpmnXml);
    this.editionMode = false;
    this.saveAsLabel = 'Guardar como';
  }

  public sendInfo(): void {
    this.modeler.parameters('mensaje');
  }

  private get modeler() {
    return this.el.nativeElement.contentWindow.modeler;
  }

  private attachModelerEventHandler() {
    this.modeler.suscribeToDoubleClick(this.onModelerDoubleClick);
  }

  private load() {
    console.log('loading process definition component ...');
  }

  private loadXml(xml: any): void {
    this.modeler.loadXML(xml);
    this.attachModelerEventHandler();
  }

  private onModelerDoubleClick(element: any): void {
    alert('elemento recibido en Angular: ' + element);
  }

  private setProcesses(): void {
    this.processService.getProcesses().then((processes) => {
      this.processes = processes;
    });
  }

}
