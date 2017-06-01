import React from 'react';
import Grid from './grid/Grid.component';
import moment from 'moment';
export default class App extends React.Component {
    /**
     *  New Year's Day |  Monday, January 2, 2017
        U.S. Martin Luther King Day | Monday, January 16, 2017
        U.S. Presidents Day | Monday, February 20, 2017
        Good Friday | Friday, April 14, 2017
        Easter Monday | Monday, April 17, 2017
        U.K. May Day | Monday, May 1, 2017
     */
    render(){
        var data = [
                {"id":1, "event":"New Year's Day", "date":"Monday, January 2, 2017"},
                {"id":2, "event":"U.S. Martin Luther King Day", "date":"Monday, January 16, 2017"},
                {"id":3, "event":"U.S. Presidents Day", "date":"Monday, February 20, 2017"},
                {"id":4, "event":"Good Friday", "date":"Friday, April 14, 2017"},
                {"id":5, "event":"Easter Monday", "date":"Monday, April 17, 2017"},
                {"id":5, "event":"U.K. May Day", "date":"Monday, May 1, 2017"},
                {"id":6, "event":"Nilima's Birthday", "date":"Monday, May 1, 2017"}
            ]

        data = data.map(function(val, index){
            val.date = moment(val.date).toDate();
            return val;
        })
        let gridOptions = {
            columns:[
                {"field":"id","label":"Id", "type":"number"},
                {"field":"event","label":"Event", "type":"string","labelFunction":function(row,column) { return row[column.field].toLowerCase().replace("NILIMA","MY LOVE") }},
                {"field":"date","label":"Date", "type":"date","format":"D/MM/YYYY"}
            ],
            data : data,
            rowCount:20,
            rowHeight:20
        }
        return (<div>
            <Grid title="Test Grid" gridOptions={gridOptions}/>
        </div>)
    }
}
