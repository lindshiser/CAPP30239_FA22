// Simple Histogram

const height = 400,
    width = 600,
    margin = ({ top: 25, right: 10, bottom: 50, left: 10 }),
    padding = 1; // distance between each bin

const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

d3.json('climate-jan.json').then((data) => {

  const x = d3.scaleLinear() // x scale
    .domain(d3.extent(data, d => d.average)).nice()
    .range([margin.left, width - margin.right]);
  
  const y = d3.scaleLinear() // y scale
    .range([height - margin.bottom, margin.top])
    .domain([0,10]); // manually assigning values
    
  svg.append("g") // applying only x axis (not y)
    .attr("transform", `translate(0,${height - margin.bottom + 5})`)
    .call(d3.axisBottom(x));

  const binGroups = svg.append("g") // to svg, we're applying g
    .attr("class", "bin-group"); // giving it a class

  const bins = d3.bin() // d3.bin function will bin our data
    .thresholds(10)
    .value(d => d.average)(data);

  // an aside:
  // console.log(bins); // look at console and see 8 bins

  let g = binGroups.selectAll("g") // select all bin groups ("g"s)
    .data(bins) // use data...
    .join("g"); // ..to do a data join on g element
    // i.e. join grabs data from bins, matches to dom element ... magic of d3!

  g.append("rect") // use rectangles, with animation!
    .attr("x", d => x(d.x0) + (padding / 2)) // position with x, dividing padding in half
    .attr("width", d => x(d.x1) - x(d.x0) - padding)
    .attr("y", height - margin.bottom) // y1
    .attr("height", 0) // height 1
    .attr("fill", "steelblue")
    
    .transition() // animate!
    .duration(750) // milliseconds
    
    .attr("y", d => y(d.length)) // y2, position with y, using length from bin data
    .attr("height", d => height - margin.bottom - y(d.length)) // height2

  g.append("text")
    .text(d => d.length)
    .attr("x", d => x(d.x0) + (x(d.x1) - x(d.x0)) / 2)
    .attr("y", d => y(d.length) - 5)
    .attr("text-anchor", "middle")
    .attr("fill", "#333");

});