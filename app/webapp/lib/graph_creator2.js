// https://observablehq.com/@d3/disjoint-force-directed-graph@146
function define(runtime, observer) {
    const main = runtime.module();
    const metaurl = document.URL.split('index.html')[0];
    const fileAttachments = new Map([["graph.json", new URL("./model/input.json", metaurl)]]);
    main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
    main.builtin("getUI5", function() { return runtime._ui5controller; });
  
    main.variable(observer("chart")).define("chart", ["data", "d3", "width", "height", "color", "drag", "invalidation"], function(data, d3, width, height, color, drag, invalidation) {
        const links = data.links.map(d => Object.create(d));
        const nodes = data.nodes.map(d => Object.create(d));

        var xScale = d3.scaleLinear().domain([0, 1]).range([0, 600]);



        const simulation = d3.forceSimulation(nodes)
            .force("charge", d3.forceManyBody().strength(5))
            .force('x', d3.forceX().x(function(d) {
                var arr = [-1, +1];
                var rand = arr[Math.floor(Math.random() * 2)];
                var iPopularityVariable = (d.popularity_group === 'superpopular') ? 3 : (d.popularity_group === 'popular')? 2 : 1;
                return rand * innerWidth / 3 / (d.frequency * iPopularityVariable)
            }))
            .force('y', d3.forceY().y(function(d) {
                return d.y * 0.2;
            }))
            .force('collision', d3.forceCollide().radius(function(d) {
                return (d.frequency < 8) ? 16 : d.frequency * 2
            }));


        const svg = d3.create("svg")
            .attr("viewBox", [-width / 2, -height / 2, width, height]);

        const link = svg.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("stroke-width", d => Math.sqrt(d.value));

        const node = svg.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1)
            .selectAll("circle")
            .data(nodes)
            .join("circle")
            .attr("r", function(d) { return (d.frequency < 8) ? 16 : d.frequency * 2 })
            .attr("fill", color)
            .call(drag(simulation));

        /* tooltip */
        node.append("title")
            .text(d => d.text);

        var texts = svg.append("g")
            .attr("stroke", "#000")
            .attr("stroke-width", 0.2)
            .selectAll(".mytexts")
            .data(nodes)
            .enter()
            .append("text")
            .attr("font-size", "9")
            .attr("text-anchor", "middle")
            .call(drag(simulation));



        /*create the actual texts */
        texts.text(function(d) {
            var s = d.text;
            s = d.text.slice(0, 8);
            return (d.text.length > s.length) ? s + "..." : s
        });

        /* create a tooltip */
        texts.append("title")
            .text(d => d.text);

        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("cx", function(d) {
                    return d.x
                })
                .attr("cy", function(d) {
                    return d.y
                });

            texts
                .attr("x", function(d) {
                    return d.x
                })
                .attr("y", function(d) {
                    return d.y
                });
        });

        invalidation.then(() => simulation.stop());

        return svg.node();
    });
    main.variable(observer("data")).define("data", ["FileAttachment", "getUI5"], function(FileAttachment, getUI5) {
        return (
            getUI5().graphData
        )
    });
    main.variable(observer("height")).define("height", function() {
        return (
            680
        )
    });
    main.variable(observer("color")).define("color", ["d3"], function(d3) {
        const scale = d3.scaleOrdinal([`#c6d8eb`, `#8BAFD6`, `#4078b5`]);
        return d => scale(d.popularity_group);
    });
    main.variable(observer("drag")).define("drag", ["d3"], function(d3) {
        return (
            simulation => {

                function dragstarted(event, d) {
                    if (!event.active) simulation.alphaTarget(0.3).restart();
                    d.fx = d.x;
                    d.fy = d.y;
                }

                function dragged(event, d) {
                    d.fx = event.x;
                    d.fy = event.y;
                }

                function dragended(event, d) {
                    if (!event.active) simulation.alphaTarget(0);
                    d.fx = null;
                    d.fy = null;
                }

                return d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended);
            }
        )
    });
    main.variable(observer("d3")).define("d3", ["require"], function(require) {
        return (
            require("d3@6")
        )
    });
    return main;
}

exports = { graph_define: define };