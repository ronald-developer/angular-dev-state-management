import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {debounceTime, map, startWith, tap} from 'rxjs/operators';

@Component({
  selector: 'app-mat-form-field-chips-select',
  templateUrl: './mat-form-field-chips-select.component.html',
  styleUrls: ['./mat-form-field-chips-select.component.css']
})
export class MatFormFieldChipsSelectComponent {

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  @Input() model = new  FormControl([]);
  @Input() title = 'Search'
  @Input() placeholder = '';
  textControl = new FormControl();
  filteredValues: Observable<KeyValuePair[]>;  
  selectedValues: KeyValuePair[] = [{key:'3', value:'Lemon'}];
  itemsToFilter: KeyValuePair[] = [{key:'1', value:'Apple'},{key:'2', value:'Orange'},{key:'3', value:'Lemon'}];  

  @ViewChild('textControlInput') textControlInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;
  constructor() {
    this.filteredValues = this.textControl.valueChanges.pipe(
        debounceTime(300),
        map((fruit: string) => this._filter(fruit)));
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();    
    let item = [...this.itemsToFilter,...this.selectedValues].filter(f=>f.value.toLowerCase()==value.toLowerCase());
    if (value && item.length==1) {
      this.selectedValues.push(item[0]);      
      event.input.value='';
      this.textControl.patchValue('');
    }
    this.model.patchValue(this.selectedValues);    
    setTimeout(()=>this.autocomplete.closePanel(),100);
  }

  remove(fruit: KeyValuePair): void {
    const index = this.selectedValues.findIndex(f=>f.key==fruit.key);
    if (index >= 0) {
      this.selectedValues.splice(index, 1);         
      this.textControl.patchValue('');  
    }
    this.model.patchValue(this.selectedValues); 
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    let item = this.itemsToFilter.find(f=>f.key==event.option.value);
    let selected = this.selectedValues.find(f=>f.key==event.option.value);
    if(item && !selected){
      this.selectedValues.push(item);
    }
    this.textControlInput.nativeElement.value = '';
    this.textControl.setValue(null);
    this.model.patchValue(this.selectedValues);    
  }

  private _filter(value: string) {
    const filterValue = value?.toLowerCase();    
    const combined = [...this.itemsToFilter,...this.selectedValues];
    return combined.filter(f=>{
      return !(this.itemsToFilter.map(m=>m.value).includes(f.value) && this.selectedValues.map(m=>m.value).includes(f.value));
    }).filter(f=> f.value.toLowerCase().includes(filterValue));
  }

}

export interface KeyValuePair{
  key :string;
  value:string;
}