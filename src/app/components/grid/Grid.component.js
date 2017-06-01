import React from 'react';
import _ from 'lodash';
import moment from 'moment';
class VerticalScrollBar extends React.Component {
    constructor(props){
        super(props);
        this.style = {
            overflow:"auto",
            border:"1px solid",
            width:"20px",
            height:"100%",
            position:"absolute",
            right:"-20px",
            top:"0px"
        }
        this.scrollStyle = {
            height:"30000px"
        }
    }
    
    render(){
        return (
            <div style={this.style}>
                <div style={this.scrollStyle}></div>
            </div>
        )
    }
}
class SortIcon extends React.Component {
    constructor(props){
        super(props);   
    }

    render () {
        let ASC = "asc";
        let DESC = "desc";
        let sortOrder = this.props.sortOrder;
        
        if(sortOrder === ASC){
            return <i className="fa fa-arrow-circle-o-down" aria-hidden="true"></i>
        }
        else  {
            return <i className="fa fa-arrow-circle-o-up" aria-hidden="true"></i>
        }
        
    }
}


class GridHeaderCell extends React.Component {
    constructor(props){
        super(props);
    }

    handleClick(e) {
        //console.log("handle click ",e);
        let notifyClick = this.props.onClick;
        if(notifyClick){
            //also pass the column information
            notifyClick(e, this.props.column);
        }            
    }


    render(){
        let style = {
            display:"table-cell",
            backgroundColor:"#000",
            color:"#FFF",
            borderRight:"1px solid #ABC",
            textAlign:"center",
            padding:"4px",
            width:"110px",
            cursor:"pointer"
        }

        if(this.props.rowIndex === 0){
          style["borderTop"] =   "1px solid #ABC";
        }
        if(this.props.cellIndex ===0){
            style["borderLeft"] =   "1px solid #ABC";
        }

        let column = this.props.column;
        let isSorted = column.isSorted;
        let sortOrder = "";
        if(isSorted) {
            sortOrder = column.sortOrder;

            return (
                <li style={style} className={"grid-column-" + column.field} onClick={this.handleClick.bind(this)}>
                    <div >
                        {column.label} <SortIcon sortOrder={sortOrder}/>
                    </div>
                </li>
            )
        }


        
        return (
            <li style={style} className={"grid-column-" + column.field} onClick={this.handleClick.bind(this)}>
                <div >
                    {column.label}
                </div>
            </li>
        )
    }
}

class GridCell extends React.Component {

    


    render() {
        let style = {
            display:"table-cell",
            borderRight:"1px solid #ABC",
            borderBottom:"1px solid #ABC",
            padding:"4px",
            width:"110px"
        }

        if(this.props.rowIndex === 0){
          style["borderTop"] =   "1px solid #ABC";
        }
        if(this.props.cellIndex ===0){
            style["borderLeft"] =   "1px solid #ABC";
        }
        
        let cellVal = this.props.cellVal;
        //console.log(cellVal)
        let column = cellVal.column;
        let text = cellVal.text;
        if(column.type === "date") {
            text = column.format!=undefined ? moment(text).format(column.format) : moment(text).format('MM/DD/YYYY');
        }

        //check for labelFunction
        if(column.labelFunction !=undefined) {
            var formattedText = column.labelFunction(cellVal.row, cellVal.column);
            text = formattedText ? formattedText : text ;
        }

        
        return (
            <li style={style} className={"grid-cell row"+this.props.rowIndex+" cell"+this.props.cellIndex}>
                <div >
                    {text.toString()}
                </div>
            </li>
        )
    }
}
class GridHeaderRow extends React.Component {
    render () {
        let style = {
            margin:"0px"
        }
        let props = this.props;
        let columns = props.columns;
        let onClickHandler = this.props.onClick;

        let cells = _.map(columns, function(column,index){
            return (
                <GridHeaderCell column={column} key={index} rowIndex={props.rowIndex} cellIndex={index} onClick={onClickHandler}/>
            )
        })
        return (
            <ul style={style} className="grid-header-row" >
                {cells}
            </ul>
        )
    }
}
class GridRow extends React.Component {
    render () {
        let style = {
            margin:"0px"
        }
        let props = this.props;
        let columns = props.columns;
        let row = props.row || [];

        
        var cells = row.map(function(cellVal,index){
            return <GridCell key={index} rowIndex={props.rowIndex} cellIndex={index} cellVal={cellVal}/>
        })

        return (
            <ul style={style} className={"grid-row row"+props.rowIndex} >
                {cells}
            </ul>
        )
    }
}

/** will have core feature, sorting */
class GridCore {

    constructor(gridOptions, sortUtil, dataService) {
        this.sortUtil = sortUtil;
        this.gridOptions = gridOptions;
        this.gridDataService = dataService;
    }

    refreshSortingIcon(){

    }
    /**
     * this will be used to change the icon for sorted column
     * and resetting the other columns
     */
    refreshColumnOnSort(columnForSorting){
        let gridOptions = this.gridOptions;
        let columns = gridOptions.columns;
        let sortUtil = this.sortUtil;

        if(columnForSorting.sortOrder === undefined) {
            columnForSorting.sortOrder = "asc";
        }

        columnForSorting.sortOrder = columnForSorting.sortOrder === "asc" ? "desc" : "asc";
        columnForSorting.isSorted = true;

        sortUtil.sortField(columnForSorting.field);
        
        
        //sort data
        this.gridDataService.data().sort(columnForSorting.sortOrder === "asc" ? sortUtil.numericAscSort.bind(sortUtil) : sortUtil.numericDescSort.bind(sortUtil))


        /**reset others sort order and then set sort order for current column */
        gridOptions.columns = _.map(columns, function(column, index){
            
            if(column === columnForSorting){
                return columnForSorting;
            }
            column.isSorted = false;
            return column;
        })
    }

    columns() {
        return this.gridOptions.columns;
    }
    data () {
        console.log("Data ",this.gridDataService.data())
        return this.gridDataService.data();
    }
}

class GridSortUtil {
    constructor(){
        this.field = "";
    }
    /** have different sorting based on type */
    numericAscSort(a, b){
        let field = this.field;
        if (a[field] < b[field] )
            return -1
        if (a[field] > b[field] )
            return 1;
        return 0;
    }
    numericDescSort(a, b ){
        let field = this.field;
         if (a[field] > b[field] )
            return -1
        if (a[field] < b[field] )
            return 1;
        return 0;
    }

    sortField(field) {
        this.field = field;
    }
}
/**
 * this will be used for data management
 */
class GridDataService {
    constructor(data) {
        this._data = data;
    }
    sortColumn(data, column, sortFun, direction){

    }

    data(){
        return this._data ;
    }
}

export default class Grid extends React.Component {
    constructor(props){
        super(props);
        this.gridCore = new GridCore(this.props.gridOptions, new GridSortUtil(), new GridDataService(this.props.gridOptions.data));
        this.state = {};
    }
    componentWillMount(){
    }
    handleClick (e, clickedColumn) {
        console.log(arguments);
        /** basic sorting test */
        this.state = {sort: clickedColumn};
        this.gridCore.refreshColumnOnSort(clickedColumn)
        this.setState(this.state);
    }
    render() {
        let style = {
            width:"500px",
            position:"relative"
        }
        let gridOptions = this.gridCore.gridOptions ; //this.props.gridOptions;
        let columns = gridOptions.columns;

        let rows = this.gridCore.data() || [];
        
        let rowsElms = rows.map(function(row, index){
            var rowData = columns.map(function(column, colIndex){
                return {"text":row[column.field] || "","rowIndex":index,"colIndex":colIndex,"row":row, "column":column};
            });

            return <GridRow key={index} rowIndex={index} columns={columns} row={rowData}/>;
        });

        console.log(rowsElms);
        
        return (
            <div style={style}>
                <GridHeaderRow columns={columns} onClick={this.handleClick.bind(this)} rowIndex="-1"/>
                {rowsElms}
                <VerticalScrollBar />
            </div>
        )
    }
}
