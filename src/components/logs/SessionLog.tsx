import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/system/Box';
import { SessionViewType } from 'frontend-backend';
import { ExtendedErrorLogType } from 'intersection';
import AtomicLog from './AtomicLog';
import './SessionLog.scss';

interface Props {
    changeHandler: Function;
    expanded: string | false;
    log: SessionViewType;
    index: number;
}

export default function SessionLog(props:Props) {

    const [errorExpanded, setErrorExpanded] = React.useState<string | false>(false);

    const handleChange =
          (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setErrorExpanded(isExpanded ? panel : false);
          };

    return (
        <Accordion className='accordion-container' expanded={props.expanded === `${props.index}`} onChange={props.changeHandler(`${props.index}`)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`log${props.index}-content`}
                id={`log${props.index}bh-header`}
                className="accordion-summary-wrapper"
            >
            <Box>
                <Typography className="field">session: {props.log.sessionId}</Typography>
                <Typography className="field">{props.log.timestamp}</Typography>
                <Typography className="field">total errors: {props.log.totalErrors}</Typography>
            </Box>
            </AccordionSummary>
            <Divider></Divider>
            <AccordionDetails>
                <Box className="accordion-details">
                    <Typography className="accordion-details-error-label">errors:</Typography>
                    <Box className="accordion-details-errors-wrapper">
                        {props.log.errors.map((error: ExtendedErrorLogType<string>, index: number) => {
                            return <AtomicLog log={error} index={index} key={index} expanded={errorExpanded} changeHandler={handleChange}/>
                        })}
                    </Box>
                </Box>
            </AccordionDetails>
        </Accordion>
    )
}
