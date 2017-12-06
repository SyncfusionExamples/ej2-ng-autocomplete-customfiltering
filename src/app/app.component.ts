import { Component } from '@angular/core';
import { AutoCompleteComponent, FilteringArgs } from '@syncfusion/ej2-ng-dropdowns';
import { DataManager, Query, DataOptions } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';

@Component({
  selector: 'my-app',
  // specifies the template string for the AutoComplete component with change event
  template: `<ej-autocomplete id='autocomplete' (filtering)='onFiltering($event)' [dataSource]='data' [placeholder]='text'></ej-autocomplete>`
})
export class AppComponent {
  constructor() {
  }
  // defined the array of data
  public data: string[] = ['test', 'test2', 'best', 'west'];

  //set the placeholder to AutoComplete input
  public text: string = "Find a value";

  public onFiltering: EmitType<FilteringArgs> = (e: FilteringArgs) => {
    e.preventDefaultAction = true;
    let query: Query = new Query();
    // frame the query based on search string with filter type.
    query = (e.text !== '') ? query.where('', 'startswith', e.text, true) : query;
    let dataManager: DataManager = new DataManager(this.data as DataOptions | JSON[]);
    dataManager.executeQuery(query).then((response: any) => {
      let suggestions: any[] = [];
      suggestions.push('myItem');
      suggestions = suggestions.concat(response.result);
      //pass the filter data source, filter query to updateData method.
      e.updateData(suggestions);
    })
  }
}
