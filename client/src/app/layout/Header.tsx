import React from 'react'
import { AppBar, Switch, Toolbar, Typography } from '@mui/material'


interface props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

const Header = ({darkMode, handleThemeChange}: props) => {
    return (
        <>
            <AppBar position='static' sx={{mb: 4}}>
                <Toolbar>
                    <Typography variant='h6'>
                        RE-STORE
                    </Typography>
                    <Switch checked={darkMode} onClick={handleThemeChange}/>
                </Toolbar>
            </AppBar>
        </>

    )
}

export default Header