/* Assignment: Line Chart Exercise
Due: Sunday, October 23 at 11:59pm  */

const height = 500,
    width = 800,
    margin = ({ top: 15, right: 30, bottom: 35, left: 40 });
    
const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);
 
d3.csv('long-term-interest-canada.csv').then(data => {
    
    // create function to correct format of Date
    let timeParse = d3.timeParse("%Y-%m");
    
    // coerce string to number
    for(let d of data) {
        d.Num = +d.Num;
        d.Month = timeParse(d.Month);
    }

    console.log(data);

    // create axis scales
    let x = d3.scaleTime() // x-axis is time scale
        .domain(d3.extent(data, d => d.Month))
        .range([margin.left, width - margin.right])
    
    let y = d3.scaleLinear() // y-axis is linear (numbers) scale
        .domain([0,d3.max(data, d => d.Num)])
        .range([height - margin.bottom, margin.top])

    // append group element
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .attr("class", "x-axis")
        .call(d3.axisBottom(x).tickSizeOuter(0));
    
    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .attr("class", "y-axis")
        .call(d3.axisLeft(y).tickSizeOuter(0).tickFormat(d => d + "%").tickSize(-width));

    svg.append("text")
        .attr("class", "x-label")
        .attr("text-anchor", "end")
        .attr("x", width - margin.right)
        .attr("y", height)
        .attr("dx", "-0.5em")
        .attr("dy", "-0.5em") 
        .text("Month");
    
    svg.append("text")
        .attr("class", "y-label")
        .attr("text-anchor", "end")
        .attr("x", -margin.top/2)
        .attr("dx", "-0.5em")
        .attr("y", 10)
        .attr("transform", "rotate(-90)")
        .text("Interest rate");

    // generate a line
    let line = d3.line()
        .x(d => x(d.Month)) // position x point
        .y(d => y(d.Num)) // position y point
       ;

    // format line
    svg.append("path")
        .datum(data)
        .attr("d", line)
        .attr("fill", "none") // don't fill line
        .attr("stroke", "steelblue")
  });