const { nodes, links } = graphData;

const container = document.getElementById("graph-container");
const svg = d3.select("#graph-svg");
const W = container.clientWidth;
const H = container.clientHeight;

const g = svg.append("g");

const zoom = d3
  .zoom()
  .scaleExtent([0.4, 2.5])
  .on("zoom", (e) => g.attr("transform", e.transform));
svg.call(zoom);

const sim = d3
  .forceSimulation(nodes)
  .force(
    "link",
    d3
      .forceLink(links)
      .id((d) => d.id)
      .distance(120)
      .strength(0.5),
  )
  .force("charge", d3.forceManyBody().strength(-250))
  .force("center", d3.forceCenter(W / 2, H / 2))
  .force("collision", d3.forceCollide(40));

const link = g
  .append("g")
  .selectAll("line")
  .data(links)
  .join("line")
  .attr("stroke", "#ccc")
  .attr("stroke-width", 1.5);

const nodeG = g
  .append("g")
  .selectAll("g")
  .data(nodes)
  .join("g")
  .style("cursor", "pointer")
  .call(
    d3
      .drag()
      .on("start", (e, d) => {
        if (!e.active) sim.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on("drag", (e, d) => {
        d.fx = e.x;
        d.fy = e.y;
      })
      .on("end", (e, d) => {
        if (!e.active) sim.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }),
  );

nodeG
  .append("circle")
  .attr("r", 8)
  .attr("fill", "#534AB7")
  .attr("stroke", "#AFA9EC")
  .attr("stroke-width", 2);

nodeG
  .append("text")
  .text((d) => d.label)
  .attr("dy", 22)
  .attr("text-anchor", "middle")
  .attr("font-size", "12px")
  .attr("fill", "#666")
  .style("pointer-events", "none");

nodeG.on("click", (e, d) => {
  window.location.href = d.url;
});

sim.on("tick", () => {
  link
    .attr("x1", (d) => d.source.x)
    .attr("y1", (d) => d.source.y)
    .attr("x2", (d) => d.target.x)
    .attr("y2", (d) => d.target.y);
  nodeG.attr("transform", (d) => `translate(${d.x},${d.y})`);
});
