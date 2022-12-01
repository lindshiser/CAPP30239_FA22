(function choropleth_multiples() {

  const tooltip = d3.select("body")
    .append("div")
    .attr("class", "svg-tooltip")
    .style("position", "absolute")
    .style("visibility", "hidden");

  const height = 610,
    width = 975;

  let states;

  Promise.all([
    d3.json("data/cleaned/access.json"),
    d3.json("libs/states-albers-10m.json")
  ]).then(([data, us]) => {
    states = topojson.feature(us, us.objects.states);
    createChart(data, "2003", '#choropleth-multi-row1');
    createChart(data, "2007", '#choropleth-multi-row1');
    createChart(data, "2010", '#choropleth-multi-row2');
    createChart(data, "2012", '#choropleth-multi-row2');
  });

  function createChart(allData, year, elemId) {
    const data = allData[year];
    const dataById = {};

    for (let d of data) {
      d.share = +d.share;
      dataById[d.id] = d;
    }

    const color = d3.scaleQuantize()
      .domain([0, 100]).nice()
      .range(d3.schemePurples[9]);

    const path = d3.geoPath();

    const svg = d3.select(elemId)
      .append("div")
      .html(`<h3>${year}</h3>`)
      .attr("class", "chart")
      .append("svg")
      .attr("viewBox", [0, 0, width, height]);

    svg.append("g")
      .selectAll("path")
      .data(states.features) // Q: should this be 'states.features'?
      .join("path")
      .attr("fill", d => (d.id in dataById) ? color(dataById[d.id].share) : '#ccc')
      .attr("d", path)
      .on("mousemove", function (event, d) {
        let info = dataById[d.id];
        tooltip
          .style("visibility", "visible")
          .html(`${info?.state}<br>${info?.share}%`)
          .style("top", (event.pageY - 10) + "px")
          .style("left", (event.pageX + 10) + "px");
        d3.select(this).attr("fill", "goldenrod");
      })
      .on("mouseout", function () {
        tooltip.style("visibility", "hidden");
        d3.select(this).attr("fill", d => (d.id in dataById) ? color(dataById[d.id].share) : '#ccc');
      });
  }

  d3.select("#choropleth-multi-legend")
    .node()
    .appendChild(
      Legend(
        d3.scaleOrdinal(
          ["10", "20", "30", "40", "50", "60", "70", "80", "90+"],
          d3.schemePurples[9]
        ),
        { title: "Share of households with internet access (%)" }
      ));

})();

