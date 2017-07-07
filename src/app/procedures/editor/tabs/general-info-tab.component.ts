import { Component, EventEmitter,  Input, OnInit, Output } from '@angular/core';

import { Procedure } from '../../data-types/procedure';
import { Office } from '../../data-types/office';
import { Entity } from '../../data-types/entity';
import { Position } from '../../data-types/position';

import { ProcedureService } from '../../services/procedure.service';
import { AuthorityService } from '../../services/authority.service';

@Component({
  selector: 'general-info-tab',
  templateUrl: './general-info-tab.component.html',
  styleUrls: ['./general-info-tab.component.scss'],
  providers: [ProcedureService, AuthorityService]
})

export class GeneralInfoTabComponent implements OnInit {

  @Output() public onCancel = new EventEmitter();  
  @Output() public isEditable = new EventEmitter<boolean>(); 
  @Input() public procedure: Procedure;

  public offices: Office[] = [];
  public entities: Entity[] = [];
  public positions: Position[] = [];
  public isNewProcedure = false;
  public disabled = true;

  constructor(private procedureService: ProcedureService, private authorityService: AuthorityService) {}

  ngOnInit() {       
    this.setProcedureStatus();
     this.setInitialValues();     
  }
  
  public async cancel() {
    await this.setProcedure();
    this.onCancel.emit();
  }

  public editProcedure(): void {
    this.disabled = false;
    this.isEditable.emit(true);
  }

  public onChangeEntity(entityUID: string) {
    this.setOffices(entityUID); 
    this.setPositions(entityUID);
    this.procedure.authority.office.uid = '';
    this.procedure.authority.position.uid = '';
  } 

  public onChangePosition(positionUID: string): void {
    if (positionUID === '') {
      return;
    }
    let position = this.positions.find(position => position.uid === positionUID);
    
    this.procedure.authority.position.phone = position.phone;
    this.procedure.authority.contact.name  = position.officer.name;
    this.procedure.authority.contact.email = position.officer.email;    
  }

  private setInitialValues(): void {
    this.setEntities();
    if (!this.isNewProcedure) {
      this.setOffices(this.procedure.authority.entity.uid);
      this.setPositions(this.procedure.authority.entity.uid);
    }
   } 
    
  private setEntities(): void {
    this.authorityService.getEntities().then((entities) => {
      this.entities = entities;
    });
  }

  private async setOffices(entityUID: string) {
   await this.authorityService.getEntity(entityUID).then((entity) => {       
      this.offices = entity.offices;      
    });   
  }

  private setPositions(entityUID: string) {
    this.authorityService.getEntity(entityUID).then((entity) => {       
      this.positions = entity.positions;         
    });   
  }

  private async setProcedure() {
    await this.procedureService.getProcuedure(this.procedure.uid).then((procedure) => {
      this.procedure = procedure;
    });
  }

  private setProcedureStatus(): void {
    if (this.procedure.uid === '') {
      this.isNewProcedure = true;
      this.disabled = false;
    }
  }

  public saveProcedureChanges(): void {
    if (!this.validation()) {
      return;
    }    
    if (this.isNewProcedure) {  
     this.createNewProcedure();      
       alert("El trámite fue creado sido creado.");
    } else {
      this.updateProcedure();
      alert("El trámite se actualizó correctamente.");
    }  
    this.isEditable.emit(false);
  }

  private updateProcedure(): void {   
    this.procedureService.updateProcedure(this.procedure).then((procedure) =>{});
  }

  private createNewProcedure(): void {    
    this.procedureService.createProcedure(this.procedure).then((procedure)=>{
      this.procedure = procedure;
    });
  }

  private validation(): boolean {
    if (this.procedure.name === '') {
      alert("El nombre del trámite se encuentra en blanco.");
      return false;
    }
    if (this.procedure.stage === '') {
      alert("Seleccionar una etapa de la lista.");
      return false;
    }
    if (this.procedure.theme === '') {
      alert("Seleccionar un tema de la lista.");
      return false;
    }      
    if (this.procedure.authority.entity.uid === '') {
      alert("Seleccionar una dependencia de la lista.");
      return false;
    }
    return true;
  }

}
