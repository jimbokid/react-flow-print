import React from 'react';
import ReactFlowPage from "./ReactFlowPage";
import "./ReactFlowPrintPreviewPage.css"


/**
 * Represents a print preview page for `ReactFlow`.
 *
 * @component
 * @param {Object[]} listOfNodes - An array of nodes to be rendered in the print preview page.
 * Each node object should have necessary attributes required by `ReactFlowPage` component.
 *
 * @returns {React.Component} A React component displaying the print preview of nodes.
 *
 * @example
 * const nodes = [...]; // Some logic to fill nodes
 * <ReactFlowPrintPreviewPage listOfNodes={nodes} />
 */
const ReactFlowPrintPreviewPage = ({
                                     listOfNodes
                                   }) => {

  return (
    <div className={'printWrapper'}>
      {listOfNodes.map((node, index) => (
        <div className={'printPage'}>
          <ReactFlowPage page={node} isPrintPreview/>
        </div>
      ))}
    </div>
  );
};

export default ReactFlowPrintPreviewPage;
