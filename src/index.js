import React from "react";
import ReactDOM from "react-dom";

class HelloMessage extends React.Component {
    render() {
        return <h1>Hello {this.props.name}</h1>;
    }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<HelloMessage name="Kosh" />, mountNode);
