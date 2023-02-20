import { useContext } from 'react';
import { AtomicViewType, ErrorViewType, SessionViewType } from 'frontend-backend';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Log from './Log';
import PageNav from './PageNav';
import {StateContext} from '../routes/Main';

export default function LogDisplay() {
    
    const stateContext = useContext(StateContext);
    const { view, data } = stateContext;

    return (
        <>
            <List>
                {(data as AtomicViewType[]|SessionViewType[]|ErrorViewType[]).map((log, index) => {
                    return (
                        <ListItem key={index}>
                            <Log index={index} view={view} log={log}/>
                        </ListItem>
                    )
                })}
            </List>
            <PageNav/>
        </>
    )
}
