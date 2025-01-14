import React from 'react';
import Axis from './axis';

/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
export default (props) => {
    const xSettings = {
        translate: 'translate(0,' + (props.height - props.padding) + ')',
        scale: props.xScale,
        orient: 'bottom'
    };
    const ySettings = {
        translate: 'translate(' + props.padding + ', 0)',
        scale: props.yScale,
        orient: 'left'
    };
    return <g className="xy-axis">
    <Axis {...xSettings} />
    <Axis {...ySettings} />
  </g>;
};
