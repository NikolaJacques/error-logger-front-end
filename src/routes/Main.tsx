import React from 'react';
import { useState, createContext, useEffect } from 'react';
import { ViewType, AtomicViewType, SessionViewType, ErrorViewType } from 'frontend-backend';
import { ErrorResponseType } from 'delivery-backend';
import ViewSelector from '../components/ViewSelector';
import Typography from '@mui/material/Typography';
import LogDisplay from '../components/LogDisplay';
import ErrorHandler from '../components/ErrorHandler';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import DateSelector from '../components/DateSelector';
import dayjs, { Dayjs } from 'dayjs';
import {useNavigate} from 'react-router-dom';
import './Main.scss';

type LogType = AtomicViewType | SessionViewType | ErrorViewType;
    
interface SuccessResponseType extends ErrorResponseType {logs: LogType[], total:number};

interface State {
    view: ViewType;
    page: number;
    limit: number;
    startDate: Dayjs;
    endDate: Dayjs;
    data: LogType[];
    total: number;
    changeState: (newState: State) => void;
}

export const StateContext = createContext({} as State);

export default function Main() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const changeState = (newState: State) => {

        const {view, page, limit, startDate, endDate} = newState;

        const token = sessionStorage.getItem('token');
        if (!token){return navigate('/login')};

        const fetchData = async () => {
            try {
                const urlString = `http://localhost:8080/logs/635d4399854b53aa6a6a4f0a?view=${view}&limit=${limit}&page=${page}&startDate=${startDate.toISOString().split('Z')[0]}&endDate=${endDate.toISOString().split('Z')[0]}`;
                const response = await fetch(encodeURI(urlString), {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                const status = response.status;
                const data = await response.json();
                if (!response.ok){
                    const error = new Error() as ErrorResponseType;
                    error.message = status + ' ' + data.message;
                    throw error;
                }
                return data as SuccessResponseType;
            }
            catch(err){
                throw err;
            }
        }
    
        setLoading(true);
    
        fetchData()
            .then(data => setStateContext({...newState, data:(data as any).logs, total: data.total, changeState}))
            .then(() => setLoading(false))
            .catch((error) => {
                setError(true);
                const statusCode = parseInt(error.message.split(' ')[0]);
                console.log(error.message, statusCode);
                if (statusCode===401){return navigate('/login')};
            });
    }

    const [stateContext, setStateContext] = useState({
        view: 'atomic' as ViewType,
        page: 1,
        limit: 10,
        startDate: dayjs("1900-01-01"),
        endDate: dayjs(),
        data: [],
        total: 0,
        changeState
    });

    useEffect(() => {
        changeState(stateContext);
    },[])

    return (
        <ErrorHandler>
            <StateContext.Provider value={stateContext}>
            <Box className='title-container'>
                <Typography className='title' variant="h5" component="p" align="left">Project Title</Typography>
                <Box className='selectors'>
                    <DateSelector/>
                    <ViewSelector/>
                </Box>
            </Box>
            {error ? <Typography component="p">An error occured: Data couldn't be fetched.</Typography> :
                    loading ?
                    <Box className='loader'>
                        <Typography>Loading Data</Typography>
                        <CircularProgress />
                    </Box> :
                    <LogDisplay/>
            }
        </StateContext.Provider>
        </ErrorHandler>
    )
}

