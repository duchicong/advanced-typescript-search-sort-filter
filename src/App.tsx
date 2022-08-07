import React from 'react';
import Filters from './components/Filters';
import { PeopleRenderer } from './components/renderers/PeopleRenderer';
import { WidgetRenderer } from './components/renderers/WidgetRenderer';
import { SearchInput } from './components/SearchInput';
import { Sorters } from './components/Sorters';
import IFilter from './interfaces/IFilter.ts';
import IPerson from './interfaces/IPerson';
import ISorters from './interfaces/ISorters';
import IWidget from './interfaces/IWidget';
import people from './mock-data/people';
import widgets from './mock-data/widget';
import genericFilter from './utils/genericFilter';
import genericSearch from './utils/genericSearch';
import genericSort from './utils/genericSort';

function App() {
  const [query, setQuery] = React.useState<string>('');
  const [showPeople, setShowPeople] = React.useState<boolean>(false);
  const [widgetSortProperty, setWidgetSortProperty] = React.useState<ISorters<IWidget>>({ property: 'title', isDescending: false });
  const [peopleSortProperty, setPeopleSortProperty] = React.useState<ISorters<IPerson>>({ property: 'firstName', isDescending: false });
  const [widgetFilterProperties, setWidgetFilterProperties] = React.useState<Array<IFilter<IWidget>>>([]);
  const [peopleFilterProperties, setPeopleFilterProperties] = React.useState<Array<IFilter<IPerson>>>([]);

  const buttonText = showPeople ? "Show widgets" : "Show people";

  return (
    <>
      <button className="btn btn-primary" onClick={() => setShowPeople(!showPeople)}>{buttonText}</button>
      <SearchInput setSearchQuery={(query) => {
        setQuery(query);
      }} />
      {!showPeople ? (
        <>
          <h2>Widgets:</h2>
          <Sorters dataSource={widgets} initialSortProperty="title">
            {(widget) => <WidgetRenderer {...widget} />}
          </Sorters>
          <br />
          <Filters
            object={widgets[0]}
            onChangeFilter={property => {
              const propertyMatch = widgetFilterProperties.some(
                widgetFilterProperty => widgetFilterProperty.property === property.property
              );
              const fullMatch = widgetFilterProperties.some(
                widgetFilterProperty => widgetFilterProperty.property === property.property
                  && widgetFilterProperty.isTruthySelected === property.isTruthySelected
              );

              if (fullMatch) {
                setWidgetFilterProperties(
                  widgetFilterProperties.filter(
                    widgetFilterProperty => widgetFilterProperty.property !== property.property
                      && widgetFilterProperty.isTruthySelected !== property.isTruthySelected
                  )
                );
              } else if (propertyMatch) {
                setWidgetFilterProperties([
                  ...widgetFilterProperties.filter(
                    widgetFilterProperty => widgetFilterProperty.property !== property.property
                  ),
                  property
                ]);
              } else {
                setWidgetFilterProperties([
                  ...widgetFilterProperties, property
                ]);
              }
            } } properties={[]}          />
          {
            widgets.filter((widget) =>
              genericSearch(widget, ['title', 'description'], query, true)
            )
              .filter(widget => genericFilter(widget, widgetFilterProperties))
              .sort((a, b) => {
                return genericSort(a, b, widgetSortProperty);
              })
              .map(widget => <WidgetRenderer {...widget} key={widget.id} />)
          }
        </>
      ) : (
        <>
          <h2>People:</h2>
          <Sorters dataSource={people} initialSortProperty="firstName">
            {
              (person) => <PeopleRenderer {...person} />
            }
          </Sorters>
          
          <br />
          <Filters
            object={people[0]}
            properties={peopleFilterProperties}
            onChangeFilter={property => {
              peopleFilterProperties.includes(property)
                ? setPeopleFilterProperties(peopleFilterProperties.filter(personFilterProperty => personFilterProperty !== property))
                : setPeopleFilterProperties([
                  ...peopleFilterProperties, property
                ]);
            }}
          />
          {
            people.filter(person => genericSearch(person, ['firstName', 'lastName'], query, true))
              .filter(widget => genericFilter(widget, peopleFilterProperties))
              .sort((a, b) => {
                return genericSort(a, b, peopleSortProperty);
              })
              .map(person => <PeopleRenderer {...person} />)
          }
        </>
      )}
    </>
  );
}

export default App;
