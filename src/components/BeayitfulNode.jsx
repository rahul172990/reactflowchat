/* eslint-disable react/prop-types */
import { MessageCircle } from "lucide-react";
import { Handle, Position } from "reactflow";

const BeautifulNode = ({ data }) => {
  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
        backgroundColor: "#fff",
        minWidth: "240px",
        maxWidth: "260px",
        transition: "transform 0.2s",
        fontFamily: "sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#ccfbf1",
          borderBottom: "1px solid #99f6e4",
          padding: "8px 12px",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#115e59",
            display: "flex",
            alignItems: "center",
          }}
        >
          <MessageCircle
            size={14}
            className="text-teal-700"
            style={{
              marginRight: 5,
            }}
          />
          Send Message
        </span>
        <span
          style={{
            width: "10px",
            height: "10px",
            backgroundColor: "#4ade80",
            borderRadius: "50%",
            border: "1px solid white",
            boxShadow: "0 0 2px rgba(0,0,0,0.15)",
          }}
        ></span>
      </div>

      {/* Body */}
      <div
        style={{
          padding: "12px",
          fontSize: "14px",
          color: "#333",
          whiteSpace: "pre-line",
          wordWrap: "break-word",
        }}
      >
        {data?.label || "No message"}
      </div>

      {/* Handles */}
      <Handle
        type="target"
        position={Position.Left}
        style={{
          width: 8,
          height: 8,
          backgroundColor: "#353839",
          borderRadius: "50%",
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{
          width: 8,
          height: 8,
          backgroundColor: "#353839",
          borderRadius: "50%",
        }}
      />
    </div>
  );
};

export default BeautifulNode;
