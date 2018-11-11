import {
  Component, ElementRef, EventEmitter, Input, Output
} from '@angular/core';

@Component({
  selector: 'emp-ng-autocomplete-control',
  host: {
    '(document:click)': 'handleClick($event)'
  },
  templateUrl: './autocomplete-control.html',
  styleUrls: ['./autocomplete-control.scss']
})

export class AutocompleteControl {

  filteredList = [];
  items: any[] = [];

  query = '';
  elementRef: any;

  isHideControl = false;
  isAddFlag = false;

  _tags: any;
  @Input()
  set tags(tags: any) {
    this._tags = tags;
    this.loadItems();
  }
  get tags(): any {
    return this._tags;
  }

  @Input() isWritable = true;

  @Input() config: object = { valueField: 'name' };

  @Output() select = new EventEmitter<string[]>();

  constructor(myElement: ElementRef) {
    this.elementRef = myElement;
  }

  filter(): void {
    if (this.query !== '') {
      this.filteredList = this.items.filter(function (el) {
        return el.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
      }.bind(this));
      if (this.filteredList.length === 0) {
        this.isAddFlag = true;
      } else {
        this.isAddFlag = false;
      }
    } else {
      this.filteredList = [];
    }
  }

  addItem(): void {
    // save to api
    const newItem: Object = {
      name: this.query, selected: true
    };
    this.items.push(newItem);
    this.select.emit(this.items.filter(item => item.selected === true));

    this.isAddFlag = false;
  }

  handleClick(event): void {
    let clickedComponent = event.target;
    let inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if (!inside) {
      this.isHideControl = true;
    }
  }

  onSelectItem(selectedItem: any): void {
    this.updateItem(selectedItem.name, true);
    this.select.emit(this.items.filter(item => item.selected === true));
  }

  onUnselectItem(selectedItem: any): void {
    this.updateItem(selectedItem.name, false);
    this.select.emit(this.items.filter(item => item.selected === true));
  }

  private loadItems(): void {
    this.items = [];
    this.tags.forEach((obj, i) => {
      this.items[i] = obj;
    });

  }

  private updateItem(selectedItemName: string, selected: boolean): void {
    const index = this.items.findIndex((x) => x.name === selectedItemName);
    this.items[index].selected = selected;
  }

  onClick(): void {
    this.query = '';
    this.filteredList = this.items;
    this.isHideControl = false;
  }

}
