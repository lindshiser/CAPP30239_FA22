let height = 500,
    width = 800,
    margin = ({ top: 25, right: 75, bottom: 35, left: 30 })
    innerWidth = width - margin.left - margin.right;

const svg = d3.select("#chart")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

d3.csv("adoption.csv").then(data => {
  let timeParse = d3.timeParse("%Y");

  let technologies = new Set();

  for (let d of data) {
    d.year = timeParse(d.year);
    d.share = +d.share;
    technologies.add(d.technology);
  }

  let x = d3.scaleTime()
    .domain(d3.extent(data, d => d.year))
    .range([margin.left, width - margin.right]);

  let y = d3.scaleLinear()
    .domain(d3.extent(data, d => d.share))
    .range([height - margin.bottom, margin.top]);

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickSize(-innerWidth).tickFormat(d => d + "%"));

  let line = d3.line()
    .x(d => x(d.year))
    .y(d => y(d.share));
 
  for (let technology of technologies) {
    let technologyData = data.filter(d => d.technology === technology);

    let g = svg.append("g")
      .attr("class", "technology")
      .on('mouseover', function () {
        d3.selectAll(".highlight").classed("highlight", false);
        d3.select(this).classed("highlight", true);
      });

    if (technology === "Radio") { 
      g.classed("highlight", true);
    }

    g.append("path")
      .datum(technologyData)
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("d", line)

    let lastEntry = technologyData[technologyData.length - 1];

    g.append("text")
      .text(technology)
      .attr("x", x(lastEntry.year) + 3)
      .attr("y", y(lastEntry.share))
      .attr("dominant-baseline", "middle")
      .attr("fill", "#999");
  }
  
});