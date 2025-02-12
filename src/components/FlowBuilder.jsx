import { useState } from "react";
import ReactFlow, {
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
} from "reactflow";
import toast, { Toaster } from "react-hot-toast";
import "reactflow/dist/style.css";
import AnimatedEdge from "./AnimatedEdge";

const initialNodes = [];
const initialEdges = [];

const nodeType = {
  imageNode: "Image Node",
  textNode: "Message Node",
};

// Define custom edge types
const edgeTypes = {
  animated: AnimatedEdge,
};

function FlowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = (params) => {
    setEdges((eds) => addEdge({ ...params, type: "animated" }, eds));
  };

  const onDrop = (event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("application/reactflow");
    const position = { x: event.clientX, y: event.clientY };

    const newNode = {
      id: `${nodes.length + 1}`,
      type,
      position,
      data: { label: nodeType[type] },
    };

    setNodes((nds) => nds.concat(newNode));
  };

  const isValidConnection = (connection) => {
    const existingEdges = edges.filter(
      (edge) => edge.source === connection.source
    );
    return existingEdges.length === 0;
  };

  const saveFlow = () => {
    const nodesWithEmptyTargets = nodes.filter(
      (node) => !edges.some((edge) => edge.target === node.id)
    );

    if (nodesWithEmptyTargets.length > 1) {
      toast.error("Cannot save flow.");
      return;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Toaster />
      <div
        onDrop={onDrop}
        onDragOver={(event) => event.preventDefault()}
        style={{ flex: 1 }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={(event, node) => setSelectedNode(node)}
          isValidConnection={isValidConnection}
          edgeTypes={edgeTypes} // Add custom edge types
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
      <div
        style={{
          width: "200px",
          borderLeft: "1px solid #ddd",
        }}
      >
        {selectedNode ? (
          <div>
            <h3
              style={{
                padding: "10px",
                borderBottom: "1px solid #ccc",
                borderRadius: "5px",
                marginBottom: 30,
                cursor: "pointer",
              }}
              onClick={() => setSelectedNode(null)}
            >
              {" "}
              {"< Message"}
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <input
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  width: 150,
                }}
                type="text"
                value={selectedNode.data.label}
                onChange={(event) => {
                  const newLabel = event.target.value;

                  setSelectedNode((prevNode) => ({
                    ...prevNode,
                    data: { ...prevNode.data, label: newLabel },
                  }));

                  setNodes((nds) =>
                    nds.map((node) =>
                      node.id === selectedNode.id
                        ? { ...node, data: { ...node.data, label: newLabel } }
                        : node
                    )
                  );
                }}
              />
            </div>
          </div>
        ) : (
          // Nodes Panel
          <div>
            <button
              onClick={saveFlow}
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                margin: 10,
                width: "175px",
                backgroundColor: "black",
                color: "white",
                cursor: "pointer",
              }}
            >
              Save Changes
            </button>
            <div
              style={{
                display: "flex",
                borderBottom: "1px solid #ccc",
              }}
            ></div>

            <div
              draggable
              onDragStart={(event) =>
                event.dataTransfer.setData("application/reactflow", "textNode")
              }
              style={{
                padding: "10px",
                border: "1px solid blue",
                color: "blue",
                borderRadius: "5px",
                cursor: "grab",
                margin: 10,
              }}
            >
              Messages
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FlowBuilder;
