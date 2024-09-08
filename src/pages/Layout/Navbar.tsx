import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';

const Nav = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const menuItems = ['HOME', 'SHOW', 'DONATE', 'HELP', 'LOG IN'];

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (item: string) => {
    const formattedItem = item.trim().toLowerCase().replace(/\s+/g, '');
    navigate(`/${formattedItem}`);
    handleClose();
  };

  return (
    <AppBar position="static" sx={{ background: 'inherit', boxShadow: "none", mb: "5px" }}>
      <Toolbar>
        <IconButton
          edge="start"
          aria-label="menu"
          onClick={handleMenu}
          sx={{ display: { sm: 'none' },color:"white"  }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
          {menuItems.map((item, index) => (
            <Link
              key={`${item}-${index}`}
              href="#"
              underline="none"
              color="#A4A4A4"
              sx={{ '&:hover': { color: 'black' }, fontSize: '0.875rem' }}
              onClick={() => handleNavigation(item)}
            >
              {item}
            </Link>
          ))}
        </Box>

      </Toolbar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{ display: { sm: 'none' }}}
      >
        {menuItems.map((item, index) => (
          <MenuItem key={`${item}-${index}`} onClick={() => handleNavigation(item)}>
            <Link
              href="#"
              underline="none"
              color="#A4A4A4"
              sx={{ '&:hover': { color: 'black' }, width: '100%' }}
            >
              {item}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </AppBar>
  );
};

export default Nav;
