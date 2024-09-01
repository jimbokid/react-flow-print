import React, {useCallback, useEffect} from 'react';
import {
  addEdge,
  Background,
  Controls,
  MiniMap,
  ReactFlow, ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow
} from "@xyflow/react";
import Box from "@mui/material/Box";
import "./App.css"


/**
 * `ReactFlowPage` Component.
 * This component handles the creation and manipulation of flow diagrams in React.
 *
 * @component
 * @param {object} props - The properties that define the behavior of the ReactFlowPage component.
 * @param {object} props.page - The page data to be used for generating the flow nodes and edges.
 * @param {Array} props.page.initialNodes - The initial nodes to set up for the flow diagram.
 * @param {Array} props.page.initialEdges - The initial edges between nodes to set up for the flow diagram.
 * @param {boolean} [props.isPrintPreview=false] - A flag to indicate if the component is in print preview mode. In this mode, zoom and drag capabilities are disabled.
 *
 * @example
 * <ReactFlowPage
 *    page={{
 *      initialNodes: [...],
 *      initialEdges: [...]
 *    }}
 *    isPrintPreview={false}
 * />
 *
 */
const ReactFlowPageInner = props => {
  const {page, isPrintPreview = false} = props;
  const {
    initialNodes,
    initialEdges,

  } = page

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Function to adjust node positions to the top-left corner
  const adjustNodePositions = (nodes) => {
    if (nodes.length === 0) return nodes;

    const minX = Math.min(...nodes.map(node => node.position.x));
    const minY = Math.min(...nodes.map(node => node.position.y));

    return nodes.map(node => ({
      ...node,
      position: {
        x: node.position.x - minX,
        y: node.position.y - minY,
      },
    }));
  };

  const {fitView} = useReactFlow();


  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  // Use useEffect to update nodes and edges when page prop changes
  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [page, setNodes, setEdges, initialNodes, initialEdges,isPrintPreview]);


  useEffect(() => {
    if (isPrintPreview) {
      const adjustedNodes = adjustNodePositions(initialNodes);
      setNodes(adjustedNodes);
      setEdges(initialEdges);
      fitView({padding: 0.1, includeHiddenNodes: true});
    }

  }, [page, setNodes, setEdges, initialNodes, initialEdges, fitView, isPrintPreview]);

  return (
    <Box component="main" sx={{flex: 1, height: 'calc(100vh - 150px)', p: 5}}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        //Prevent Zoom and drag when print preview mode
        zoomOnScroll={!isPrintPreview}
        zoomOnPinch={!isPrintPreview}
        panOnDrag={!isPrintPreview}
        panOnScroll={!isPrintPreview}
        panOnScrollSpeed={!isPrintPreview ? 0.5 : 0}
        onWheel={e => {
          if (!isPrintPreview) {
            e.preventDefault()
            return false
          }
        }}
      >
        {!isPrintPreview && (
          <>
            <Controls/>
            <MiniMap/>
          </>
        )}


        <Background variant="dots" gap={12} size={1}/>
      </ReactFlow>

      {isPrintPreview && <div className={'printOverlay'}/>}
    </Box>
  );
};

// wrapping with ReactFlowProvider is done outside of the component
function ReactFlowPage(props) {
  return (
    <ReactFlowProvider>
      <ReactFlowPageInner {...props} />
    </ReactFlowProvider>
  );
}

export default ReactFlowPage;
