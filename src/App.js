import React, {useCallback, useState} from "react";
import "./App.css"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import '@xyflow/react/dist/style.css';
import {ButtonGroup} from "@mui/material";
import ReactFlowPage from "./ReactFlowPage";
import ReactFlowPrintPreviewPage from "./ReactFlowPrintPreviewPage";


const listOfNodes = [
  {
    pageName: 'Conversation 1',
    initialNodes: [
      {id: '1', position: {x: 0, y: 0}, data: {label: 'Some conversation from page 1'}},
      {id: '2', position: {x: 0, y: 100}, data: {label: 'Another conversation from page 1'}},
    ],
    initialEdges: [{id: 'e1-2', source: '1', target: '2'}]
  },
  {
    pageName: 'Conversation 2',
    initialNodes: [
      {id: '1', position: {x: 105, y: 50}, data: {label: 'page 2 1'}},
      {id: '2', position: {x: 220, y: 150}, data: {label: 'Some conversation from page 2'}},
    ],
    initialEdges: [{id: 'e1-2', source: '1', target: '2'}]
  },
]

function App() {
  const [page, setPage] = useState(1);
  const [isPrintPreview, setIsPrintPreview] = useState(false);
  const pagesCount = listOfNodes.length;

  const handleChangePage = useCallback(
    (pageNumber) => {
      if (pageNumber < 1 || pageNumber > pagesCount) {
        return
      }
      setPage(pageNumber)
    },
    [pagesCount],
  );

  const currentPage = listOfNodes[page - 1]

  return (
    <>
      <Box sx={{flexGrow: 1}}>
        <AppBar position="static" className={'header'}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              React Flow Print
            </Typography>
            Page:{page}
            <ButtonGroup variant="contained" aria-label="Basic button group">
              <Button onClick={() => {
                handleChangePage(page - 1)
              }}>Prev</Button>
              <Button onClick={() => {
                handleChangePage(page + 1)
              }}>Next</Button>
            </ButtonGroup>

            <Button color="inherit" onClick={() => {
              setIsPrintPreview(!isPrintPreview)
            }}>Print: {isPrintPreview ? 'On' : 'Off'}</Button>
          </Toolbar>
        </AppBar>

        {isPrintPreview ? <ReactFlowPrintPreviewPage listOfNodes={listOfNodes}/> : <ReactFlowPage page={currentPage}/>}
      </Box>
    </>
  );
}

export default App;
