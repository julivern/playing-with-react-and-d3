import React, {useState, useEffect} from 'react';
import d3 from 'd3';

/* eslint-disable react/prop-types */
export default function Axis(props) {
    const [graphRef, setGraphRef] = useState(null);
    const renderAxis = () => {
        const node = graphRef;
        const axis = d3.svg.axis().orient(props.orient).ticks(5).scale(props.scale);
        d3.select(node).call(axis);
    };
    useEffect(() => {
        renderAxis();
    });
    return (
        <g className="axis"
        ref={setGraphRef}
        transform={props.translate}/>
    );
}
