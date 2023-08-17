import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  myControl: FormControl = new FormControl('');
  @Input() name: string= ''; 

  options = ['aoption1', 'aaoption2', 'aboption3', 'aacoption4', 'option5', 'option6', 'option7', 'option8'];

  filteredOptions: Observable<string[]> = new Observable<string[]>();
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  onFilterOptionSelected(optionValue: string) {
    console.log('optionSelected: ', optionValue);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
