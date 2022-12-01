const tooltip = d3.select("body")
  .append("div")
  .attr("class", "svg-tooltip")
  .style("position", "absolute")
  .style("visibility", "hidden");

const height = 610,
  width = 975;

const svg = d3.select("#choropleth")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

Promise.all([
  d3.csv("data/cleaned/access2020.csv"),
  d3.json("libs/states-albers-10m.json")
]).then(([data, us]) => {
  const dataById = {};

  for (let d of data) {
    d.share = +d.share;
    //making a lookup table from the array (unemployment data)
    dataById[d.id] = d;
  }

  const states = topojson.feature(us, us.objects.states);

  // Quantize evenly breakups domain into range buckets
  const color = d3.scaleQuantize()
    .domain([0, 100]).nice()
    .range(d3.schemePurples[9]);

  const path = d3.geoPath();

  d3.select("#choropleth-legend")
    .node()
    .appendChild(
      Legend(
        d3.scaleOrdinal(
          ["10", "20", "30", "40", "50", "60", "70", "80", "90+"],
          d3.schemePurples[9]
        ),
        { title: "Share of households with internet access (%)" }
      ));

  svg.append("g")
    .selectAll("path")
    .data(states.features)
    .join("path")
    .attr("fill", d => (d.id in dataById) ? color(dataById[d.id].share) : '#ccc')
    .attr("d", path)
    .on("mousemove", function (event, d) {
      let info = dataById[d.id];
      tooltip
        .style("visibility", "visible")
        .html(`${info.state}<br>${info.share}%`)
        .style("top", (event.pageY - 10) + "px")
        .style("left", (event.pageX + 10) + "px");
      d3.select(this).attr("fill", "goldenrod");
    })
    .on("mouseout", function () {
      tooltip.style("visibility", "hidden");
      d3.select(this).attr("fill", d => (d.id in dataById) ? color(dataById[d.id].share) : '#ccc');
    });
});