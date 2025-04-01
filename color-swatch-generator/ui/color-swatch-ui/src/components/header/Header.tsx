import { useState } from 'react';
import './Header.scss';
import { Box, Button, Modal, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  color: '#000',
  p: 4,
};


function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div style={{height: '5em'}}>
        <button className="raise" onClick={() => {setOpen(true)}}>Generate</button>
      </div>
      <Modal
          open={open}
          onClose={() => {setOpen(false)}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Describe your visual
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Put a cute little input box here with an example prompt (the one you already have)
            </Typography>
            <Button>Go</Button>
          </Box>
        </Modal>
    </>

  );
}
export default Header;