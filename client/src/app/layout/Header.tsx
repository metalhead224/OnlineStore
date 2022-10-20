import React from 'react'
import { AppBar, List, Switch, ListItem, Toolbar, Typography, IconButton, Badge, Box } from '@mui/material'
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart } from '@mui/icons-material';
import { useStoreContext } from '../context/StoreContext';
import { useAppSelector } from '../store/configureStore';


interface props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

const midLinks = [
    { title: 'catalog', path: '/catalog' },
    { title: 'about', path: '/about' },
    { title: 'contact', path: '/contact' }
]

const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' }
]

const navStyles = {
    color: 'inherit',
    textDecoration: 'none',
    typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'text.secondary'
    }

}


const Header = ({ darkMode, handleThemeChange }: props) => {
    const {basket} = useAppSelector(state => state.basket);
    const itemCount = basket?.items.reduce((sum, item) => sum+item.quantity, 0)
    
    return (
        <>
            <AppBar position='static' sx={{ mb: 4 }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                    <Box display='flex' alignItems='center'>
                        <Typography variant='h6' component={NavLink} to='/' sx={{ color: 'inherit', textDecoration: 'none' }}>
                            RE-STORE
                        </Typography>
                        <Switch checked={darkMode} onClick={handleThemeChange} />
                    </Box>


                    <List sx={{ display: 'flex' }}>
                        {midLinks.map(({ title, path }) => (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={navStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>

                    <Box display='flex' alignItems='center'>
                        <IconButton component={Link} to='/basket' size='large' sx={{ color: 'inherit' }}>
                            <Badge badgeContent={itemCount} color='secondary'>
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                        <List sx={{ display: 'flex' }}>
                            {rightLinks.map(({ title, path }) => (
                                <ListItem
                                    component={NavLink}
                                    to={path}
                                    key={path}
                                    sx={navStyles}
                                >
                                    {title.toUpperCase()}
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                </Toolbar>
            </AppBar>
        </>

    )
}

export default Header