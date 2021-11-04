import React, {useEffect, useState} from "react";
import * as d3 from 'd3';

/* eslint-disable no-unused-vars */
export default function Network() {
    const width = 400, height = 300;
    const [nodeGraph, setNodeGraph] = useState(null);
    const [linkGraph, setLinkGraph] = useState(null);

    const nodes = [
        {name: 'A'},
        {name: 'B'},
        {name: 'C'},
        {name: 'D'},
        {name: 'E'},
        {name: 'F'},
        {name: 'G'},
        {name: 'H'},
    ];

    const links = [
        {source: 0, target: 1, n: 1},
        {source: 0, target: 2, n: 2},
        {source: 0, target: 3, n: 3},
        {source: 1, target: 6, n: 4},
        {source: 3, target: 4, n: 5},
        {source: 3, target: 7, n: 6},
        {source: 4, target: 5, n: 7},
        {source: 4, target: 7, n: 8}
    ];

    // function drag() {
    //     function dragstarted(event, d) {
    //         d3.select(this).raise().attr("stroke", "black");
    //     }

    //     function dragged(event, d) {
    //         d3.select(this).attr("cx", d.x = event.x).attr("cy", d.y = event.y);
    //     }

    //     function dragended(event, d) {
    //         d3.select(this).attr("stroke", null);
    //     }

    //     return d3.drag()
    //         .on("start", dragstarted)
    //         .on("drag", dragged)
    //         .on("end", dragended);
    // }

    function updateLinks() {
        const link = d3.select(linkGraph)
            .selectAll('line')
            .data(links)
            .join('line')
            .style("stroke", "#f5b076")
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        const linkLabelContainer = d3.select(linkGraph)
            .selectAll('.linkLabel')
            .data(links);
        const linkLabel = linkLabelContainer.enter()
            .append("text")
            .classed("linkLabel", true)
            .attr("dy", 5)
            .text("bla");
        linkLabelContainer.exit().remove();
        return linkLabelContainer;
    }

    function updateNodes() {
        d3.select(nodeGraph)
            .selectAll('.bla')
            .data(nodes)
            .join('circle')
            .style('fill', '#ccc')
            .classed("bla", true)
            .attr('stroke', '#000')
            .attr('stroke-width', 1.5)
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .attr('r', 10);
    }

    function ticked() {
        updateNodes();
        const linkLabelContainer = updateLinks();
        linkLabelContainer.attr("transform", d => {
            const angle = Math.atan(
                (d.source.y - d.target.y) / (d.source.x - d.target.x)
                ) * 180 / Math.PI;
            return 'translate(' + [
                ((d.source.x + d.target.x) / 2), ((d.source.y + d.target.y) / 2)
            ] + ')rotate(' + angle + ')';
        });
    }

    function renderGraph() {
        d3.forceSimulation(nodes)
        .force('charge', d3.forceManyBody().strength(-100))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('link', d3.forceLink(links))
        .on('tick', ticked);
    }

    useEffect(() => {
        renderGraph();
    });

    return (
        <svg width={width} height={height}>
            <g ref={setNodeGraph}></g>
            <g ref={setLinkGraph}></g>
        </svg>
    );
}
