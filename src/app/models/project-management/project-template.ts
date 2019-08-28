/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Empty, Identifiable, PartitionedType } from '@app/models/core';


export interface ProjectTemplate extends Identifiable {
  notes: string;
  status: string;
}

export interface ActivityTemplate extends Identifiable, PartitionedType {
  id: number;
  notes: string;
  theme: string;

  activityType: string;
  executionMode: string;
  isMandatory: boolean;
  isController: boolean;

  dueOnTerm: number | string;
  dueOnTermUnit: string;
  dueOnCondition: string;
  dueOnController: number;
  dueOnRuleAppliesForAllContracts: 'true' | 'false' | '';
  duration: number | string;
  durationUnit: string;
  periodicity: string;

  entity: number;
  procedure: number;
  contractClause: string;
  legalBasis: string;

  project: ProjectTemplate;
  parent: Identifiable;

  position: number;
  level: number;
  stage: string;
  status: string;
}


export const EmptyProjectTemplate: ProjectTemplate = {
  uid: '',
  name: '',
  notes: '',
  status: ''
};


export const EmptyActivityTemplate: ActivityTemplate = {
  id: 0,
  uid: '',
  name: '',
  type: '',
  notes: '',
  theme: '',

  activityType: '',
  executionMode: '',
  isMandatory: false,
  isController: false,

  dueOnTerm: '',
  dueOnTermUnit: '',
  dueOnCondition: '',
  dueOnController: -1,
  dueOnRuleAppliesForAllContracts: 'true',

  duration: '',
  durationUnit: '',
  periodicity: '',

  entity: -1,
  procedure: -1,
  contractClause: '',
  legalBasis: '',

  project: EmptyProjectTemplate,
  parent: Empty,

  position: 0,
  level: 0,
  stage: '',
  status: '',
};


export interface ActivityTemplateOperation {
  operation: 'changeParent' | 'copyToProject' | 'insertActivity' | 'moveActivity' | 'moveToProject';
  activity: ActivityTemplate | { name: string, position: number };
  newPosition?: number;
  newParent?: ActivityTemplate;
  targetProjectUID?: string;
}
