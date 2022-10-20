/* Bar chart for library visits */

d3.csv("library_visits_jan22.csv").then(data => {

    for (let d of data) {
        d.num = +d.num; // force a number
    };

    // sort alphabetically
    data.sort((a, b) => d3.ascending(a.branch, b.branch));

    // define variables used for page layout
    const height = 600,
        width = 800,
        margin = ({ top: 25, right: 30, bottom: 35, left: 50 });

    // resize in browser
    let svg = d3.select("#chart")
        .append("svg")
        .attr("viewBox", [0,0, width, height]);

    // define x-scale
    let x = d3.scaleBand()
        .domain(data.map(d => d.branch))
        .range([margin.left, width - margin.right])
        .padding(0.1);

    // define y-scale
    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.num)]).nice() // nice() rounds the top num
        .range([height - margin.bottom, margin.top]);

    // call functions to create output, axes
    // group svg shapes together
    // y axis
    svg.append("g")
        .attr("transform", `translate(${margin.left - 5},0)`)
        .call(d3.axisLeft(y)) // y axis is on left

    // x axis
    svg.append("g")
        .attr("transform", `translate(0,${height-margin.top})`)
        .call(d3.axisBottom(x)) // x axis is on bottom

    // create bar groups
    let bar = svg.selectAll(".bar")
        .append("g")
        .data(data)
        .join("g")
        .attr("class", "bar");

    // add bars as rectangles
    bar.append("rect")
        .attr("fill", "steelblue")
        .attr("x", d => x(d.branch)) // x position attribute
        .attr("width", x.bandwidth()) // this width is the width attr on the element
        .attr("y", d => y(d.num)) // y position element
        .attr("height", d => y(0) - y(d.num)); // this height is the height attr on element

    // add labels to bars
    bar.append('text')
        .text(d => d.num)
        .attr('x', d => x(d.branch) + (x.bandwidth()/2))
        .attr('y', d => y(d.num) + 15)
        .attr('text-anchor', 'middle')
        .style('fill', 'white');

});