import { useContext } from 'react';
import { ExtendedErrorLogType } from 'intersection';
import { ErrorViewType, SessionViewType } from 'frontend-backend';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Log from './Log';
import PageNav from './PageNav';
import {StateContext} from '../routes/Main';

type AtomicViewType = ExtendedErrorLogType<string>;

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
