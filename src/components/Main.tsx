import React from 'react';
import { useState, createContext, useEffect } from 'react';
import { ViewType, AtomicViewType, SessionViewType, ErrorViewType } from 'frontend-backend';
import ViewSelector from './ViewSelector';
import Typography from '@mui/material/Typography';
import LogDisplay from './LogDisplay';
import ErrorHandler from './ErrorHandler';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

type LogType = AtomicViewType | SessionViewType | ErrorViewType;

interface State {
    view: ViewType;
    page: number;
    limit: number;
    data: LogType[];
    changeState: (newState: State) => void;
}

export const StateContext = createContext({} as State);

export default function Main() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const changeState = (newState: State) => {
        const {view, page, limit } = newState;
        const fetchData = async () => {
            try {
                const urlString = `http://localhost:8080/logs/635d4399854b53aa6a6a4f0a?view=${view}&limit=${limit}&page=${page}`;
                const response = await fetch(urlString);
                if (!response.ok){throw new Error('Failed to fetch log data')}
                const data = await response.json();
                return data.logs as LogType[];
            }
            catch(err){
                throw err;
            }
        }
    
        setLoading(true);
    
        fetchData()
            .then(logs => setStateContext({...newState, data:(logs as any), changeState}))
            .then(() => setLoading(false))
            .catch(() => setError(true));
    }

    const [stateContext, setStateContext] = useState({
        view: 'atomic' as ViewType,
        page: 1,
        limit: 10,
        data: [],
        changeState
    });

    useEffect(() => {
        changeState(stateContext);
    },[])

    return (
        <ErrorHandler>
            <Typography variant="h5" component="p" align="left" sx={{py: '1rem'}}>Project Title</Typography>
            <StateContext.Provider value={stateContext}>
                <ViewSelector/>
                {error ? <Typography component="p">An error occured: Data couldn't be fetched.</Typography> : 
                    loading ? 
                    <Box sx={{display: 'flex'}}>
                        <Typography>Loading Data</Typography>
                        <CircularProgress />
                    </Box> :
                    <LogDisplay/>
                }    
            </StateContext.Provider>
        </ErrorHandler>
    )
}

