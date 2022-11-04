// Histogram & Joins

const height = 400,
    width = 600,
    margin = ({ top: 25, right: 10, bottom: 50, left: 10 }),
    padding = 1;

const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

d3.json('climate.json').then((data) => {      
    console.log(data)

    const x = d3.scaleLinear()
        .range([margin.left, width - margin.right])
        .domain([0,65]);
  
    const y = d3.scaleLinear()
        .range([height - margin.bottom, margin.top])
        .domain([0,10]);

    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom + 5})`)
        .call(d3.axisBottom(x));

    const binGroups = svg.append("g")
        .attr("class", "bin-group");

    function updateChart(m) { // update chart, pass in the month
        const bins = d3.bin()
            .thresholds(10)
            .value(d => d.average)(data[m]);

        binGroups.selectAll("g")
            .data(bins, d => d.x0)
        .join(
            enter => { // ENTER, put it initially on page
            let g = enter.append("g")

            g.append("rect") // put bars on page
                .attr("x", d => x(d.x0) + padding / 2)
                .attr("y", height - margin.bottom)
                .attr("width", d => x(d.x1) - x(d.x0) - padding)
                .attr("height", 0)
                .attr("fill", "steelblue")
                .transition()
                .duration(750)
                .attr("y", d => y(d.length))
                .attr("height", d => height - margin.bottom - y(d.length));

            g.append("text") // put text on page
                .text(d => d.length)
                .attr("x", d => x(d.x0) + (x(d.x1) - x(d.x0)) / 2)
                .attr("y", height - margin.bottom - 5)
                .attr("text-anchor", "middle")
                .attr("fill", "#333")
                .transition()
                .duration(750)
                .attr("y", d => y(d.length) - 5);
            },
            update => { // UPDATE, animation up
            update.select("rect") 
                .transition()
                .duration(750)
                .attr("y", d => y(d.length)) // change y position
                .attr("height", d => height - margin.bottom - y(d.length)); // change height

            update.select("text") // change text
                .text(d => d.length)
                .transition()
                .duration(750)
                .attr("y", d => y(d.length) - 5);
            },
            exit => { // EXIT, animation down
            exit.select("rect")
                .transition()
                .duration(750)
                .attr("height", 0)
                .attr("y", height - margin.bottom);

            exit.select("text")
                .text("");

            exit.transition()
                .duration(750)
                .remove();
            }
        );

        svg.selectAll("foreignObject").remove();

        let temp = d3.mean(data[m], d => d.average).toFixed(1); // .toFixed(1) shortens decimal point to 1 place
        let str = `The average temperature in
                    <b style="text-transform:capitalize;">${m} 2022</b> was 
                    <b>${temp}℉</b>.` // create an html string (str)

        svg.append("foreignObject") // easiest way to add an annotation
          .attr("x", 10)
          .attr("y", 100)
          .attr("width", 120)
          .attr("height", 100)
          .append('xhtml:div') // required for safari browsers
          .append("p") // creates space for paragraph
          .html(str); // paste html into paragraph space
    }

    updateChart("january");

    d3.selectAll("select") // this is our d3 event listener; selects drop down
        .on("change", function (event) { // .on, i.e. on the change, run function
            const m = event.target.value;
            updateChart(m); 
        });
});