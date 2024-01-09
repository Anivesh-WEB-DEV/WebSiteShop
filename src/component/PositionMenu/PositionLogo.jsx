import  React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useAuth0 } from "@auth0/auth0-react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export default function PositionedMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { loginWithRedirect , logout , isAuthenticated , user } = useAuth0();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >{
        isAuthenticated ? (
          <Stack>
          <Avatar
          alt="Remy Sharp"
          src={user.picture} 
          sx={{ width: 56, height: 56 }}
        />
      </Stack>
        ) : (
          <Stack>
          <Avatar
          alt=""
          src={AccountCircleIcon}
          sx={{ width: 56, height: 56 , backgroundColor:'#3F3067' ,border:'3px solid rgb(241 228 228)'}}
        />
      </Stack>
        )
      }
       
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {user && <MenuItem onClick={handleClose}>{user.name}</MenuItem>}
        {user && <MenuItem onClick={handleClose}>{user.email}</MenuItem>}
        <MenuItem onClick={handleClose}>
        
        
        {
          isAuthenticated ? (

           <button className='auth' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
           Log Out
         </button>
          ) : (

            <button className='auth' onClick={() => loginWithRedirect()}>Log In</button>
          )
        }</MenuItem>
      </Menu>
    </div>
  );
}



