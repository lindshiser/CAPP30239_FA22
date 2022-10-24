/* D3 Line Chart */

// note that variables come before csv function, unlike bar chart
// this is becuase variables are not dependent on data
// this is a perforamnce boost!

const height = 500,
    width = 800,
    margin = ({ top: 15, right: 30, bottom: 35, left: 40 });
    
const svg = d3.select("#chart") // svg is put on page while page is loading, helps prevent jumping
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);
 
d3.csv('long-term-interest-monthly.csv').then(data => {
    
    // create function to correct format of Date
    let timeParse = d3.timeParse("%Y-%m");
    
    // don't want Value to be a string
    for(let d of data) {
        d.Value = +d.Value; // '+' forces to a number, from a string
        d.Date = timeParse(d.Date); // call function
    }

    console.log(data);

    // create scales that are Time (rather than linear and banded)
        // for x axis
    let x = d3.scaleTime()
        .domain(d3.extent(data, d => d.Date)) // domain is location; start with earliest date, go to latest
        .range([margin.left, width - margin.right]) // range is span; range is array, gets '[]'
    
        // for y axis
    let y = d3.scaleLinear() // scale is numbers, so use Linear
        .domain([0,d3.max(data, d => d.Value)]) // y-scales aways start at zero
        .range([height - margin.bottom, margin.top])

    // append group element
        // for x axis
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`) // to put x axis in right place (comment out to see alt)
        .attr("class", "x-axis")
        .call(d3.axisBottom(x).tickSizeOuter(0)); //'.tickSizeOuter(0)' to remove outer tick
    
      // for y axis
    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .attr("class", "y-axis") // only apply following code to lines in y-axis, not data lines
        .call(d3.axisLeft(y).tickSizeOuter(0).tickFormat(d => d + "%").tickSize(-width)); // '.tickFormat(d => d + "%")' to add '%'
        // '.tickSize(-width) gives (not good looking) grid lines
        // uncomment lines 27-29, 31-34 to make grid lines better

    svg.append("text")
        .attr("class", "x-label")
        .attr("text-anchor", "end")
        .attr("x", width - margin.right)
        .attr("y", height)
        .attr("dx", "0.5em")
        .attr("dy", "-0.5em") 
        .text("Year");
    
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
        .x(d => x(d.Date)) // position x point
        .y(d => y(d.Value)) // position y point
        // .curve(d3.curveNatural) // to make it swoopy
        // .curve(d3.curveBasis) // make small swoops, doesn't hit every point
        ;

    // format line
    svg.append("path")
        .datum(data)
        .attr("d", line) // "d" is an svg element/attribute; // pass through line built in line 72
        .attr("fill", "none") // don't fill line
        .attr("stroke", "steelblue") // instead, make it d3 steel blue
  });