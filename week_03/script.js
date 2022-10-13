/* Bar chart for COVID country cases */

/* get data, then use in a function */
d3.csv("covid.csv").then(data => {

    for (let d of data) {
        d.cases = +d.cases;
    };

    const height = 400,
        width = 800,
        margin = ({ top: 25, right: 30, bottom: 35, left: 50 });

    d3.select("#chart")
        .append("svg")
        .attr("viewBox", [0, 0, width, height]);

    let x = d3.scaleBand()
        .domain(data.map(d => d.country)) // arrow "=>" creates a mini anonymous function
        .range([margin.left, width - margin.right])
        .padding(0.1);

    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.cases)]) 
        .range([height - margin.bottom, margin.top]); // svgs are built from top down
    
    const xAxis = g => g // creating a group
        .call(d3,axisLeft(y)); // automatically runs the fn

});