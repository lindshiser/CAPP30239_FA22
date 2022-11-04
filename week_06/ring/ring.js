d3.json('budget-2022.json').then((data) => {
  const height = 400,
    width = 600,
    innerRadius = 125,
    outerRadius = 175,
    labelRadius = 200;

  const arcs = d3.pie().value(d => d.amount)(data); // buckets data, to make pieces of pie
  const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius); // uses inner radius and outer radius
  const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

  const svg = d3.select("#chart") // select chart
    .append("svg") // imsert svg
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  svg.append("g")
    .attr("stroke", "white") // 20-22 generate the white separators
    .attr("stroke-width", 2)
    .attr("stroke-linejoin", "round")
    .selectAll("path")
    .data(arcs)
    .join("path")
    .attr("fill", (d, i) => d3.schemeCategory10[i]) // d is data, i is index, use sceheme category 10, start with 1st color, then 2nd, then loop at 10
    .attr("d", arc); // use arc generator created on line 9

  svg.append("g")
    .attr("font-size", 10)
    .attr("text-anchor", "middle")
    .selectAll("text")
    .data(arcs)
    .join("text")
    .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
    .selectAll("tspan") // tspan is a break in the line
    .data(d => {
      return [d.data.category, d.data.amount];
    })
    .join("tspan")
    .attr("x", 0)
    .attr("y", (d, i) => `${i * 1.1}em`)
    .attr("font-weight", (d, i) => i ? null : "bold")
    .text(d => d);

  svg.append("text") // put "2022" in center of chart
    .attr("font-size", 30)
    .attr("font-weight", "bold")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .text("2022")
    .style("font-size", 20);
});