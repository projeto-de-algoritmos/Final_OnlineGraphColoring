import { Graph, Link, Node } from "./Graph.js";
import { colors } from "./Colors";

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateGraph() {
  const graph = new Graph();

  const size = randomNum(150, 50);

  for (let i = 1; i <= size; i++) {
    graph.addNode(i);
  }

  for (let i = 1; i <= size; i++) {
    const neighborNumber = randomNum(size, 1);
    graph.addEdge(i, neighborNumber);
  }

  return graph;
}

export function readGraph(txt){
  const graph = new Graph();

  txt.forEach(element => {
    graph.addNode(element[0]);
  });

  txt.forEach(element => {
    var aux = element[1].split(',');
    aux.forEach(n => {
      if(n!==""){
        graph.addEdge(element[0], n)
      }
    })
  })

  return graph;

  //num:n1,n2,n3...
}

export function formatGraph(graph) {
  const links = [];
  const nodes = [];
  Object.keys(graph.edges).forEach((sourceId) => {
    const node = new Node(sourceId);
    if (graph.colors[sourceId] >= 0) {
      node.color = colors[graph.colors[sourceId]];
    } else {
      node.color = "#121212";
    }
    nodes.push(node.toDict());

    graph.edges[sourceId].forEach((targetId) => {
      links.push(new Link(sourceId, targetId).toDict());
    });
  });

  const formatedGraph = {};
  formatedGraph["nodes"] = nodes;
  formatedGraph["links"] = links;

  return formatedGraph;
}

export function colorTheGraph(graph) {
  graph.nodes.forEach((node) => {
      const edges = graph.edges[node];
      const colorNeighbours = edges.map((edge) => graph.colors[edge]);
      const coloredNeighbours = colorNeighbours.filter((color) => color >= 0);
      const sortedColors = coloredNeighbours.sort((a, b) => a - b);
      const lowestColor = sortedColors.reduce(
          (current, next) => (current === next ? (current += 1) : current),
          0
      );
      graph.colors[node] = lowestColor;
  });

  return graph;
}
