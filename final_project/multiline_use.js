(function multiline_use() {

  let height = 500,
    width = 800,
    margin = ({ top: 25, right: 150, bottom: 35, left: 30 })
    innerWidth = width - margin.left - margin.right;

  const svg = d3.select("#multiline-use-chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

  d3.csv("data/cleaned/timeuse_exclusv.csv").then(data => {
    
    let timeParse = d3.timeParse("%Y");

    let activities = new Set();

    for (let d of data) {
      d.year = timeParse(d.year);
      d.min = +d.minutes;
      activities.add(d.activity);
    }

    let x = d3.scaleTime()
      .domain(d3.extent(data, d => d.year))
      .range([margin.left, width - margin.right]);

    let y = d3.scaleLinear()
      .domain(d3.extent(data, d => d.min))
      .range([height - margin.bottom, margin.top]);

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).tickSize(-innerWidth));

    let line = d3.line()
      .x(d => x(d.year))
      .y(d => y(d.min));
  
    for (let activity of activities) {
      let activityData = data.filter(d => d.activity === activity);

      let g = svg.append("g")
        .attr("class", "activity")
        .on('mouseover', function () {
          d3.selectAll(".highlight").classed("highlight", false);
          d3.select(this).classed("highlight", true);
        });

      if (activity === "Watching TV/movies") { 
        g.classed("highlight", true);
      }

      g.append("path")
        .datum(activityData)
        .attr("fill", "none")
        .attr("stroke", "#ccc")
        .attr("d", line)

      let lastEntry = activityData[activityData.length - 1];

      g.append("text")
        .text(activity)
        .attr("x", x(lastEntry.year) + 3)
        .attr("y", y(lastEntry.min))
        .attr("dominant-baseline", "middle")
        .attr("fill", "#999");
    };
    
  });
  
})();
