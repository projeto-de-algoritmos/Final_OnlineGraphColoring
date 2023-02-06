import "./App.css";
import { useState, useEffect } from "react";
import { ForceGraph3D } from "react-force-graph";
import { Button } from "@mui/material"
import { generateGraph, readGraph, formatGraph, colorTheGraph } from "./utils/graphMethods";

const App = () => {
  const [graph, setGraph] = useState();
  const [formatedGraph, setFormatedGraph] = useState();
  const lines = [];

  useEffect(() => {
    const g = generateGraph();
    setGraph(g);

    const fg = formatGraph(g);
    setFormatedGraph(fg);
  }, []);

  const reader = new FileReader();

  reader.onload = e => {
    var txt = e.target.result.split('\n')

    for(const l of txt){
      
      if(!/^[0-9]{1,4}:[0-9]{0,4}(,[0-9]{1,4})*$/.test(l)) continue;

      var txtA = l.split(':');
      
      lines.push(txtA);
    }

    console.log(lines);

    const g = readGraph(lines);

    setGraph(g);
    const fg = formatGraph(g);
    setFormatedGraph(fg);
  }

  const input = document.createElement("input");
  input.type = "file";

  input.onchange = e => {
    const file = e.target.files[0];
    reader.readAsText(file);
  };

  return (
    <div className="App">
      <div className="SideBar">
        <div className="SideBarContent">
          <h2>Coloração de Grafos</h2>
          <Button variant="outlined" className="button"
            onClick={() => {
              const g = generateGraph();
              setGraph(g);
              const fg = formatGraph(g);
              setFormatedGraph(fg);
            }}>
            Gerar grafo
          </Button>

          <Button variant="outlined" className="button" 
            onClick={() => {
              const g = colorTheGraph(graph);
              setGraph(g);
              const fg = formatGraph(g);
              setFormatedGraph(fg);
            }}>
            Colorir grafo
          </Button>

          <Button
            variant="outlined"
            className="button"
            onClick={() => {
              input.click();
            }}
          >
            Importar grafo
          </Button>
        </div>
      </div>

      {graph && (
        <div className="Graph">
          <ForceGraph3D
            backgroundColor="#696969"
            nodeOpacity={1}
            nodeLabel={node => `${node.id}`}
            width={window.innerWidth - 300}
            linkColor="#ffffff"
            linkOpacity={1}
            linkWidth={1.5}
            graphData={formatedGraph}
          />
        </div>
      )}
    </div>
  );
};

export default App;
