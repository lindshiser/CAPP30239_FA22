let data = 
{
  "name": "Henry VII",
  "children": [
    { "name": "Arthur" },
    { "name": "Margaret" },
    {
      "name": "Henry VIII",
      "children": [
        { "name": "Mary" },
        { "name": "Elizabeth" },
        { "name": "Edward" }
      ]
    },
    { "name": "Elizabeth" },
    { "name": "Mary" },
    { "name": "Edward" },
    { "name": "Edmund" },
    { "name": "Katherine" }
  ]
};

let margin = { top: 40, right: 90, bottom: 50, left: 90 },
  width = 660 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

let svg = d3.select("#chart").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);

let g = svg.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`); /* purpose is to relocate svg to center of page, move over x and along y */

let treeGraph = d3.tree()
  .size([width, height]); /* 'pass in a size and a width' */

let nodeData = d3.hierarchy(data);

console.log(nodeData)

let nodes = treeGraph(nodeData);

console.log(nodes.links())


let link = g.selectAll('.link')
  .data(nodes.links())
  .join('path')
  .attr('d', d3.linkHorizontal()
    .x(d => d.y)
    .y(d => d.x)
  )
  .attr('class', 'link');

let node = g.selectAll('.node')
  .data(nodes.descendants())
  .join('g')
  .attr('transform', d => `translate(${d.y},${d.x})`);

node.append('circle')
  .attr('r', 6);

node.append('text')
  .text(d => d.data.name)
  .attr('x', 12)
  .attr('dx', '.5em')
  .attr('dy', '.5em'); /* dy and dx are nudges, to nudge text around */