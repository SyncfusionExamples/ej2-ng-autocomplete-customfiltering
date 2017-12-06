# AutoComplete suggestion items customize

Needs to insert the new item in AutoComplete suggestion items.

## Solution

We can insert the new item in AutoComplete suggestion items through filtering event of ej2-autocomplete with DataManager. Please refer the below code snippet.


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


## Installing and Running Application

### Installing

To install all dependent packages, use the below command

```
npm install
```

### Run the application

To compile and run the source files, use the below command

```
npm start
```