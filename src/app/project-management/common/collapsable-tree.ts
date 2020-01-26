/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Identifiable, isEmpty } from '@app/models/core';


export interface TreeNode extends Identifiable {
  parent: Identifiable;
}


export type CollapsableTreeNodeDisplayMode = 'collapsed' | 'expanded' | 'leaf' | undefined;


export class CollapsableTree {

  constructor(private allNodes: TreeNode[], private collapsedNodes: string[]) { }


  collapseAll() {
    const withNoParent = this.allNodes.filter(x => isEmpty(x.parent)).map(x => x.uid);

    this.collapsedNodes = Array.from(withNoParent);
  }


  expandAll() {
    const withNoParent = this.allNodes.filter(x => !isEmpty(x.parent)).map(x => x.uid);

    this.collapsedNodes = Array.from(withNoParent);
  }


  nodeDisplayMode(node: TreeNode): CollapsableTreeNodeDisplayMode {
    if (this.hasCollapsedAncestor(node)) {
      return undefined;
    }

    const collapsed = this.isCollapsed(node);

    if (collapsed) {
      return 'collapsed';
    } else if (this.hasChildren(node)) {
      return 'expanded';
    } else {
      return 'leaf';
    }
  }


  toggleCollapse(node: Identifiable) {
    const index = this.collapsedNodes.indexOf(node.uid);

    if (index >= 0) {
      this.collapsedNodes.splice(index, 1);
    } else {
      this.collapsedNodes.push(node.uid);
    }
  }


  private hasChildren(node: Identifiable): boolean {
    return this.allNodes.find(x => x.parent.uid === node.uid) ? true : false;
  }


  private hasCollapsedAncestor(node: TreeNode): boolean {
    let parent = node.parent;

    while (true) {
      if (isEmpty(parent)) {
        return false;
      } else if (this.isCollapsed(parent)) {
        return true;
      } else {
        parent = this.allNodes.find(x => x.uid === parent.uid).parent;
      }
    }
  }


  private isCollapsed(node: Identifiable): boolean {
    return this.collapsedNodes.indexOf(node.uid) >= 0;
  }

}
