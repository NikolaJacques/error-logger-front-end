import React from 'react';
import Typography from '@mui/material/Typography';
import { SessionViewType, ErrorViewType, ViewType, AtomicViewType } from 'frontend-backend';
import AtomicLog from './logs/AtomicLog';
import ErrorLog from './logs/ErrorLog';
import SessionLog from './logs/SessionLog';

interface Props {
    view: ViewType;
    log: AtomicViewType|SessionViewType|ErrorViewType;
    index: number;
}

export default function Log(props: Props) {

    const [expanded, setExpanded] = React.useState<string | false>(false);
    
        const handleChange =
          (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
          };
        
        switch (props.view){
            case 'atomic':
                return <AtomicLog log={props.log as AtomicViewType} index={props.index} expanded={expanded} changeHandler={handleChange}/>;
            case 'error':
                return <ErrorLog log={props.log as ErrorViewType} index={props.index} expanded={expanded} changeHandler={handleChange}/>;
            case 'session':
                return <SessionLog log={props.log as SessionViewType} index={props.index} expanded={expanded} changeHandler={handleChange}/>;
            default:
                return <Typography>Error displaying data: check view</Typography>;
        }

}
