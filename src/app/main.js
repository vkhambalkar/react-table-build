import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header.component'

const App = (props) =>{
    return (
        <div>
            <Header/>
            {props.message}
        </div>
    )
}

ReactDOM.render(<App message="Welcome to React, changes"/>, document.getElementById("root"));