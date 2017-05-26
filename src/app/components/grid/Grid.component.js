import React from 'react';
import _ from 'lodash';
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

class GridHeaderCell extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        let style = {
            display:"table-cell",
            backgroundColor:"#000",
            color:"#FFF",
            borderRight:"1px solid #ABC",
            textAlign:"center",
            padding:"4px",
            width:"80px"
        }

        if(this.props.rowIndex === 0){
          style["borderTop"] =   "1px solid #ABC";
        }
        if(this.props.cellIndex ===0){
            style["borderLeft"] =   "1px solid #ABC";
        }
        return (
            <li style={style} className={"grid-header-cell"}>
                <div >
                    [{this.props.rowIndex}, {this.props.cellIndex}]
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
            width:"80px"
        }

        if(this.props.rowIndex === 0){
          style["borderTop"] =   "1px solid #ABC";
        }
        if(this.props.cellIndex ===0){
            style["borderLeft"] =   "1px solid #ABC";
        }
        return (
            <li style={style} className={"grid-cell row"+this.props.rowIndex+" cell"+this.props.cellIndex}>
                <div >
                    [{this.props.rowIndex}, {this.props.cellIndex}]
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
        let cells = _.times(5, function(index){
            return (
                <GridHeaderCell key={index} rowIndex={props.rowIndex} cellIndex={index}/>
            )
        })
        return (
            <ul style={style} className={"grid-row row"+props.rowIndex} >
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
        let cells = _.times(5, function(index){
            return (
                <GridCell key={index} rowIndex={props.rowIndex} cellIndex={index}/>
            )
        })
        return (
            <ul style={style} className={"grid-row row"+props.rowIndex} >
                {cells}
            </ul>
        )
    }
}

export default class Grid extends React.Component {
    constructor(props){
        super(props);
    }
    componentWillMount(){
        //console.log(JSON.stringify(this.props.gridOptions));
    }
    render() {
        let style = {
            width:"300px",
            position:"relative"
        }
        let gridOptions = this.props.gridOptions;
        let arr =  _.times(gridOptions.rowCount, function(index){
            return (
                <GridRow key={index} rowIndex={index}/>
            )
        });
        
        return (
            <div style={style}>
                <GridHeaderRow />
                {arr}
                <VerticalScrollBar />
            </div>
        )
    }
}