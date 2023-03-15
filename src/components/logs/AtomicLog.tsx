import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/system/Box';
import { AtomicViewType } from 'frontend-backend';
import Actions from 'components/Actions';
import './AtomicLog.scss';

interface Props {
    changeHandler: Function;
    expanded: string | false;
    log: AtomicViewType;
    index: number;
}

export default function AtomicLog(props:Props) {
    return (
        <Accordion className='accordion-container' expanded={props.expanded === `${props.index}`} onChange={props.changeHandler(`${props.index}`)}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`log${props.index}-content`}
            id={`log${props.index}bh-header`}
            >
                <Typography className='field-name'>{props.log.name + ': ' + props.log.message}</Typography>
                <Typography className='field-timestamp'>{props.log.timestamp}</Typography>
            </AccordionSummary>
            <Divider></Divider>
            <AccordionDetails>
                <Box className='accordion-details-wrapper'>
                    <Typography className='accordion-details'>browser: {props.log.browserVersion}</Typography>
                    <Typography className='accordion-details'>session: {props.log.sessionId}</Typography>
                </Box>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`log${props.index}-stacktrace-content`}
                        id={`log${props.index}-stacktrace-header`}
                    >
                        <Typography>stack trace:</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className='action-details'>{props.log.stack}</Typography>    
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`log${props.index}-actions-content`}
                        id={`log${props.index}-actions-header`}
                    >
                        <Typography>actions:</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Actions actions={props.log.actions}/>
                    </AccordionDetails>
                </Accordion>
            </AccordionDetails>
        </Accordion>
    )
}
