const data = [
    {
        "timestamp": "2021-08-06 07:00:00", "temperatura": "35.1"
    },
    {
        "timestamp": "2021-08-06 08:00:00", "temperatura": "35.2"
    },
    {
        "timestamp": "2021-08-06 09:00:00", "temperatura": "35.3"
    },
    {
        "timestamp": "2021-08-06 10:00:00", "temperatura": "37.0"
    },
    {
        "timestamp": "2021-08-06 11:00:00", "temperatura": "36.5"
    },
    {
        "timestamp": "2021-08-06 12:00:00", "temperatura": "38.0"
    },
    {
        "timestamp": "2021-08-06 13:00:00", "temperatura": "37.1"
    },
    {
        "timestamp": "2021-08-06 14:00:00", "temperatura": "37.8"
    },{
        "timestamp": "2021-08-06 15:00:00", "temperatura": "36.0"
    },
    {
        "timestamp": "2021-08-06 16:00:00", "temperatura": "36.9"
    },{
        "timestamp": "2021-08-06 16:30:00", "temperatura": "37.5"
    }
    ,{
        "timestamp": "2021-08-06 17:30:00", "temperatura": "35.8"
    },
    {
        "timestamp": "2021-08-06 18:00:00", "temperatura": "1.0,"
    }
]

const line = d3.line()
.curve(d3.curveStep)
.defined(d => !isNaN(d.value))
.x(d => x(d.date))
.y(d => y(d.value));

const margin = ({top: 20, right: 30, bottom: 30, left: 40});
const width = 500;

const yAxis = g => g
.attr("transform", `translate(${margin.left},0)`)
.call(d3.axisLeft(y))
.call(g => g.select(".domain").remove())
.call(g => g.select(".tick:last-of-type text").append("tspan").text(data.y));

const xAxis = g => g
.attr("transform", `translate(0,${height - margin.bottom})`)
.call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
.call(g => g.select(".domain").remove());

const height = 500;

const y = d3.scaleLinear()
.domain(d3.extent(data, d => d.value)).nice()
.range([height - margin.bottom, margin.top]);

const color = d3.scaleSequential(y.domain(), d3.interpolateTurbo);

const x = d3.scaleUtc()
.domain(d3.extent(data, d => d.date))
.range([margin.left, width - margin.right]);




    const svg = d3.create("svg")
        .attr("viewBox", [0, 0, width, height]);
  
    //const gradient = DOM.uid();
  
    svg.append("g")
        .call(xAxis);
  
    svg.append("g")
        .call(yAxis);
  
    svg.append("linearGradient")
        //.attr("id", gradient.id)
        .attr("id", "my_dataviz")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0)
        .attr("y1", height - margin.bottom)
        .attr("x2", 0)
        .attr("y2", margin.top)
      .selectAll("stop")
        .data(d3.ticks(0, 1, 10))
      .join("stop")
        .attr("offset", d => d)
        .attr("stop-color", color.interpolator());
  
    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        //.attr("stroke", gradient)
        .attr("stroke-width", 1.5)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", line);
  
   document.getElementById('my_dataviz').innerHTML = svg.node();