import React from 'react';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import {Action} from 'frontend-backend';

interface Props {
    actions: Action[]
}

export default function Actions(props: Props) {
  return (
        <List>
            {props.actions?props.actions.map((action, index) => {
                return (
                    <ListItem key={index} sx={{width: "100%", display: 'flex'}}>
                        <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm:'row'}, justifyContent:"space-around", width:"100%"}}>
                            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                                <Typography>target:</Typography>
                                <Box sx={{display: 'flex', flexDirection: 'column', marginLeft: '1rem'}}>
                                    <Typography>element: {action.target.localName}</Typography>
                                    <Typography>id: {action.target.id}</Typography>
                                    <Typography>class: {action.target.className}</Typography>
                                </Box>
                            </Box>
                            <Box>
                                <Typography>type: {action.type}</Typography>
                            </Box>
                        </Box>
                    </ListItem>
                )
            }):'[no data]'}   
        </List>
    )
}
