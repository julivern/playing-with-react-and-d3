import React, {useState, useEffect} from 'react';
import {select} from 'd3-selection';
import {axisLeft, axisBottom} from 'd3-axis';

/* eslint-disable react/prop-types */
export default function Axis(props) {
    const [graphRef, setGraphRef] = useState(null);
    const renderAxis = () => {
        const node = graphRef;
        let axis = null;
        switch (props.orient) {
            case 'left':
                axis = axisLeft(props.scale).ticks(5);
                break;
            case 'bottom':
                axis = axisBottom(props.scale).ticks(5);
                break;
            default:
                axis = axisBottom(props.scale).ticks(5);
        }
        select(node).call(axis);
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
