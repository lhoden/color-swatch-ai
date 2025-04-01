import * as React from 'react';
import {AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import './Header.scss';

const pages = ['API'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Header() {
  return (
    <div>
      <button className="raise">Raise</button>
    </div>
  );
}
export default Header;