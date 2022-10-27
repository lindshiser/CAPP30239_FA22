let height = 400, // set variables
    width = 600,
    margin = ({ top: 25, right: 30, bottom: 35, left: 40 });

const svg = d3.select("#chart") // add viewBox to svg
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

d3.csv('penguins.csv').then(data => { // loading in data
  
  let x = d3.scaleLinear() // setting x scale
    .domain(d3.extent(data, d => d.body_mass_g)).nice() // data
    .range([margin.left, width - margin.right]); // space data takes on the page

  let y = d3.scaleLinear() // setting y scale
    .domain(d3.extent(data, d => d.flipper_length_mm)).nice() /// d3. extent is same as d3.min and d3.max
    .range([height - margin.bottom, margin.top]);

  svg.append("g") // create x axis
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .attr("class", "x-axis")
    .call(d3.axisBottom(x).tickFormat(d => (d/1000) + "kg").tickSize(-height + margin.top + margin.bottom)) // tickFormat puts "kg", tickSize is gridlines, tickSize(0) gets rid of axis ticks too

  svg.append("g") // create y axis
    .attr("transform", `translate(${margin.left},0)`)
    .attr("class", "y-axis")
    .call(d3.axisLeft(y).tickSize(-width + margin.left + margin.right))

  svg.append("g") // fills with dots
    .attr("fill", "black")
    .selectAll("circle") // 1. select circles, see "d3 circles" for more symbols
    .data(data) // 2. get data
    .join("circle") // 3. join data to circles
    .attr("cx", d => x(d.body_mass_g)) // how to position circles, from center of x
    .attr("cy", d => y(d.flipper_length_mm)) // "" from center of y
    .attr("r", 2) // radius is 2
    .attr("opacity", 0.75); // if dots sit on top of each other

  const tooltip = d3.select("body").append("div") // selects body tag of HTML, then append a new div
    .attr("class", "svg-tooltip") // give div a class of svg-toolti[]
    .style("position", "absolute") // apply styles
    .style("visibility", "hidden"); // ""

  d3.selectAll("circle") // select all cricles
    .on("mouseover", function(event, d) { // when someone mouses over circle, create function
      d3.select(this).attr("fill", "red"); // d3 selects "this" (ie the circle), fill circle with red
      tooltip // identified on 39, 
        .style("visibility", "visible") // set style from visibility=hidden to =visible
        .html(`Species: ${d.species}<br />Island: ${d.island}<br />Weight: ${d.body_mass_g/1000}kg`);
    })
    .on("mousemove", function(event) {
      tooltip // when mouse moves, get event
        .style("top", (event.pageY - 10) + "px") // - 10 gives padding to tooltip, so it's not on circle
        .style("left", (event.pageX + 10) + "px");
    })
    .on("mouseout", function() { // mouseout is when mouse goes off circle
      d3.select(this).attr("fill", "black"); // circle goes back to black
      tooltip.style("visibility", "hidden"); // circle goes back to hidden
    })
    
});