/* eslint-disable react/prop-types */
const AnimatedEdge = ({ id, sourceX, sourceY, targetX, targetY, style }) => {
  const edgePath = `M ${sourceX},${sourceY} L ${targetX},${targetY}`;

  return (
    <path
      id={id}
      style={style}
      className="animated-edge"
      d={edgePath}
      fill="none"
      strokeWidth={2}
      stroke="#ff00cc"
    />
  );
};

export default AnimatedEdge;
