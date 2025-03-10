import { useState } from 'react'
import './Header.css';

function Header() {
  return (
    <div className="header">
        <h2>Color Palette Dreamer</h2>
        <div>
            {/*make the buttons and fonts for this really cute */}
            <button>Describe Your Setting</button>
        </div>
    </div>
  )
}

export default Header;
