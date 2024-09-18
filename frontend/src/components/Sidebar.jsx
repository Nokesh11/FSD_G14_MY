import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Home, School, AccountCircle } from '@mui/icons-material';

const menuItems = [
    { text: 'Home', icon: <Home />, route: '/' },
    { text: 'Courses', icon: <School />, route: '/courses' },
    { text: 'Profile', icon: <AccountCircle />, route: '/profile' },
];

function Sidebar() {
    return (
        <Drawer 
            variant="permanent" 
            anchor="left"
            PaperProps={{ sx: { backgroundColor: '#1a1a1a', color: 'white', width: 250 } }}
        >
            <div className="sidebar-header" style={{ padding: '16px' }}>
                <Typography variant="h6" component="div" sx={{ color: 'white', fontWeight: 'bold' }}>
                    My Dashboard
                </Typography>
            </div>

            <List>
                {menuItems.map((item, index) => (
                    <ListItem button key={index} sx={{ '&:hover': { backgroundColor: '#333333' } }}>
                        <ListItemIcon sx={{ color: 'white' }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}

export default Sidebar;
