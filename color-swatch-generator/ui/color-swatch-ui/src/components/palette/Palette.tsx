import { useState, useEffect } from 'react'
import './Palette.css';
import nearestColor from 'nearest-color';
import { colornames } from 'color-name-list';
import {Tooltip} from '@mui/material';

function Palette() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // nearestColor need objects {name => hex} as input
  const colors = colornames.reduce((o: any, a: any) => Object.assign(o, { [a.name]: a.hex }), {});

  const nearest = nearestColor.from(colors);

  useEffect(() => {
    fetch("/ask-ai/prompt", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({ "prompt": "Can you output a color palette with seven hex codes that would visually describe the following scene: 'It is a beautiful fall October day.'"}),
    })
    .then(async (r) => {
        setLoading(false);
        if (r.ok) {
            let data = await r.json();
            setData(data);
            console.log('yay: ', data);
        }
    });
  }, []);

  return (
    <>
        <div className="container">
          {(data.map((swatch: any) => (
            <div className="palette">
                <div className="color-swatch-name">{swatch.hexCode}</div>
                <Tooltip title={swatch.description}>
                  <div className="color-swatch" style={{background: swatch.hexCode}}>
                    {nearest(swatch.hexCode).name}
                  </div>
                </Tooltip>
            </div>
          )))}
        </div>
    </>
  )
}

export default Palette;
