import React from 'react';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { ActionType } from 'intersection';
import './Actions.scss';

interface Props {
    actions: ActionType[]
}

export default function Actions(props: Props) {
  return (
        <List>
            {props.actions?props.actions.map((action, index) => {
                return (
                    <ListItem key={index} className="action-item-container">
                        <Box className="action-item-wrapper">
                            <Box className="action-item-wrapper-level-2">
                                <Typography>target:</Typography>
                                <Box className="target">
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
