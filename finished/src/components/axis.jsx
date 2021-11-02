import React from 'react';
import d3 from 'd3';

/* eslint-disable react/prop-types */
export default class Axis extends React.Component {
    constructor(props) {
        super(props);
        this.graphRef = null;
        this.setFocusRef = element => {
            this.graphRef = element;
        };
    }

    componentDidUpdate() {
        this.renderAxis();
    }

    componentDidMount() {
        this.renderAxis();
    }

    renderAxis() {
    // var node  = this.refs.axisee;
        const node = this.graphRef;
        const axis = d3.svg.axis().orient(this.props.orient).ticks(5).scale(this.props.scale);
        d3.select(node).call(axis);
    // d3.select("g").call(axis);
    }

    render() {
        return <g
      className="axis"
      // ref="axisee"
      ref={this.setFocusRef}
      // id="graph1"
      transform={this.props.translate} />;
    }
}
