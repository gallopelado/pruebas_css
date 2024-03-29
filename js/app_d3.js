// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 1060 - margin.left - margin.right,
    height = 530 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
//d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",
d3.csv("../tiempos.csv",

  // When reading the csv, I must format variables:
  function(d){
      console.log(d)
    //return { date : d3.timeParse("%Y-%m-%d")(d.date), value : d.value }
    return { timestamp : d3.timeParse("%Y-%m-%dT%H:%M:%S")(d.timestamp), value : d.temperatura }
  },

  // Now I can use this dataset:
  function(data) {
    console.log(data)
    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.timestamp; }))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Max value observed:
    const max = d3.max(data, function(d) { return +d.value; })

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([25, max])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Set the gradient
    svg.append("linearGradient")
      .attr("id", "line-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", y(0))
      .attr("x2", 0)
      .attr("y2", y(max))
      .selectAll("stop")
        .data([
          {offset: "0%", color: "blue"},
          {offset: "100%", color: "red"}
        ])
      .enter().append("stop")
        .attr("offset", function(d) { return d.offset; })
        .attr("stop-color", function(d) { return d.color; });

    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "url(#line-gradient)" )
      .attr("stroke-width", 2)
      .attr("d", d3.line()
        .x(function(d) { return x(d.timestamp) })
        .y(function(d) { return y(d.value) })
        )

        // otra linea
        d3.csv("../tiempos2.csv",

        // When reading the csv, I must format variables:
        function(d){
            console.log(d)
          //return { date : d3.timeParse("%Y-%m-%d")(d.date), value : d.value }
          return { timestamp : d3.timeParse("%Y-%m-%dT%H:%M:%S")(d.timestamp), value : d.temperatura }
        },

        // Now I can use this dataset:
        function(data) {

          // Set the gradient
          svg.append("linearGradient")
            .attr("id", "line-gradient")
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", 0)
            .attr("y1", y(0))
            .attr("x2", 0)
            .attr("y2", y(max))
            .selectAll("stop")
              .data([
                {offset: "0%", color: "blue"},
                {offset: "100%", color: "red"}
              ])
            .enter().append("stop")
              .attr("offset", function(d) { return d.offset; })
              .attr("stop-color", function(d) { return d.color; });

          // Add the line
          svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "green" )
            .attr("stroke-width", 2)
            .attr("d", d3.line()
              .x(function(d) { return x(d.timestamp) })
              .y(function(d) { return y(d.value) })
              )

      })
})