/* eslint-disable react/prop-types */
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
import BeautifulNode from "./BeayitfulNode";
import { MessageCircle, SkipBack } from "lucide-react";

const nodeType = {
  // imageNode: "Image Node",
  textNode: BeautifulNode,
};

// Define custom edge types
const edgeTypes = {
  animated: AnimatedEdge,
};

const initialNodes = [];
const initialEdges = [];

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
      data: { label: `Test Message ${nodes.length + 1}` },
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
    } else {
      toast.success("Messages flow saved.");
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
          nodeTypes={nodeType}
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
            <div
              style={{
                padding: "10px",
                borderBottom: "1px solid #ccc",
                borderRadius: "5px",
                marginBottom: 30,
                cursor: "pointer",
              }}
              onClick={() => setSelectedNode(null)}
            >
              <SkipBack size={14} className="text-teal-700" />
              <span> Messages</span>
            </div>

            <span
              style={{
                display: "flex",
                justifyContent: "flex-start",
                padding: "12px",
              }}
            >
              Enter Text
            </span>
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
                display: "grid",
                placeItems: "center",
              }}
            >
              <div>
                <MessageCircle
                  size={20}
                  className="text-teal-700"
                  style={{ marginRight: 5 }}
                />
              </div>
              <div>Messages Node</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FlowBuilder;
