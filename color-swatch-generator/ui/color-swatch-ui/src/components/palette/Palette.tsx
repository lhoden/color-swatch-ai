import { useState, useEffect } from 'react'
import './Palette.css';
import nearestColor from 'nearest-color';
import { colornames } from 'color-name-list';
import './Animation.scss';
import { Box, Button, Modal, Typography, Tooltip } from '@mui/material';
import Textarea from '@mui/joy/Textarea';

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


function Palette() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState('');

  const handlePromptChange = (event: any) => {
    setPrompt(event.target.value);
  }

  const handleSubmit = () => {
    promptAI();
    setLoading(true);
  }

  // nearestColor need objects {name => hex} as input
  const colors = colornames.reduce((o: any, a: any) => Object.assign(o, { [a.name]: a.hex }), {});

  const nearest = nearestColor.from(colors);

  useEffect(() => {
    promptAI();
  }, []);

  const promptAI = async () => {
    await fetch("/ask-ai/prompt", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({ "prompt": `Can you output a color palette with seven hex codes that would visually describe the following scene: '${prompt ? prompt : 'It is a beautiful fall October day.'}'`}),
    })
    .then(async (r) => {
        setLoading(false);
        if (r.ok) {
            let data = await r.json();
            setData(data);
            console.log('yay: ', data);
        }
    });
    setLoading(false);
    setOpen(false);
  }

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
            <Textarea className="prompt-box" minRows={2} variant="outlined" value={prompt} onChange={handlePromptChange}/>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <Button className="go-button" onClick={handleSubmit}>Send in Prompt ✨</Button>
            )}
          </Box>
        </Modal>
        <div className="container">
          {(data.map((swatch: any) => (
            <div className="palette">
                <div className="color-swatch-name">{swatch.hexCode}</div>
                <Tooltip title={swatch.description}>
                  <div className="color-swatch" style={{background: swatch.hexCode}}>
                    <Typography variant="h4" className="color-name">{nearest(swatch.hexCode).name}</Typography>
                  </div>
                </Tooltip>
            </div>
          )))}
        </div>
    </>
  )
}

export default Palette;
