import React, {Component} from 'react';
import * as d3 from "d3";

class BarChart extends Component {
    componentDidMount() {
        this.drawChart();
    }
    drawChart() {
        const data = [12, 5, 6, 6, 9, 10];
        const w = 700;
        const h = 300;
        const svg = d3.select("body").append("svg").attr("width", w).attr("height", h);
        svg.selectAll("rect")
           .data(data)
           .enter()
           .append("rect")
           .attr("x", (d, i) => i * 70)
           // .attr("y", 0)
           .attr("y", (d, i) => h - 10 * d)
           .attr("width", 65)
           // .attr("width", 25)
           .attr("height", (d, i) => d * 10)
           // .attr("height", (d, i) => d)
           .attr("fill", "green");
        // svg.call(zoom);
        svg.selectAll("text")
           .data(data)
           .enter()
           .append("text")
           .text((d) => d)
           .attr("x", (d, i) => i * 70)
           .attr("y", (d, i) => h - (10 * d) - 3);
        const g = svg.append("g");
        const zoom = d3.zoom().on("zoom", e => {
            g.attr("transform", (transform = e.transform));
            g.style("stroke-width", 3 / Math.sqrt(transform.k));
            points.attr("r", 3 / Math.sqrt(transform.k));
          });
    }
    render(){
        return <div id={"#" + this.props.id}></div>
    }
}

export default BarChart;