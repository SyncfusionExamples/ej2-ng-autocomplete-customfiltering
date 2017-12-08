import { Component } from '@angular/core';
import { AutoCompleteComponent, FilteringArgs } from '@syncfusion/ej2-ng-dropdowns';
import { DataManager, Query, DataOptions, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';

@Component({
  selector: 'my-app',
  // specifies the template string for the AutoComplete component with change event
  template: `<ej-autocomplete id='autocomplete' (filtering)='onFiltering($event)' [dataSource]='data' [query]='query'  [fields]='remoteFields' [placeholder]='text'></ej-autocomplete>`
})
export class AppComponent {
  constructor() {
  }
  // defined the array of data 
  public data: DataManager = new DataManager({
        url: 'http://services.odata.org/V4/Northwind/Northwind.svc/Products',
        adaptor: new ODataV4Adaptor,
        crossDomain: true
    });
  public remoteFields: {[key:string]:string} = { value: 'ProductName' };
  //set the placeholder to AutoComplete input
  public text: string = "Find a value";
    //public query: Query = new Query().select(['ProductID', 'ProductName']);
  public onFiltering: EmitType<FilteringArgs> = (e: FilteringArgs) => {
    e.preventDefaultAction = true;
    let query: Query = new Query().select(['ProductID', 'ProductName']);
    // frame the query based on search string with filter type.
    query = (e.text !== '') ? query.where('ProductName', 'startswith', e.text, true) : query;
    this.data.executeQuery(query).then((response: any) => {
      let suggestions: { [key: string]: string; }[]= [] ;
      let newItem={};
      newItem[this.remoteFields.value]='myItem';
      suggestions.push(newItem);
      suggestions = suggestions.concat(response.result); 
      //pass the filter data source, filter query to updateData method.
      e.updateData(suggestions);
    })
  }
}
