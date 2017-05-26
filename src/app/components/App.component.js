import React from 'react';
import Grid from './grid/Grid.component';
export default class App extends React.Component {
    render() {
        let gridOptions = {
        columns: [{
                "field": "col1",
                "label": "Column1"
            }, {
                "field": "col2",
                "label": "Column2"
            }],
            rowCount: 10,
            rowHeight: 20
        }
        return ( 
            <div>
                <h1> React Grid</h1>
                < Grid title = "Test Grid" gridOptions = {gridOptions}/> 
            </div>
        )
    }
}