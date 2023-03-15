import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/system/Box';
import { ErrorViewType } from 'frontend-backend';
import { List, ListItem } from '@mui/material';
import './ErrorLog.scss';

interface Props {
    changeHandler: Function;
    expanded: string | false;
    log: ErrorViewType;
    index: number;
}

export default function ErrorLog(props:Props) {

    const [browserExpanded, setBrowserExpanded] = React.useState<string | false>(false);

    const handleChange =
          (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setBrowserExpanded(isExpanded ? panel : false);
          };

    return (
        <Accordion className='accordion-container' expanded={props.expanded === `${props.index}`} onChange={props.changeHandler(`${props.index}`)}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`log${props.index}-content`}
            id={`log${props.index}bh-header`}
            >
                <Box className='accordion-summary-wrapper'>
                    <Typography className='field-name'>{props.log.name + ': ' + props.log.message}</Typography>
                    <Box className='totals-fields-wrapper' sx={{color: 'text.secondary'}}>
                        <Typography>total errors: {props.log.totalErrors}</Typography>
                        <Typography>total sessions: {props.log.totalSessions}</Typography>
                    </Box>
                </Box>
            </AccordionSummary>
            <Divider></Divider>
            <AccordionDetails>
                <Box className='accordion-details-wrapper'>
                    <Typography className='field-stack-label'>stack:</Typography>
                    <Typography className='field-stack-content'>{props.log.stack}</Typography>
                </Box>
                {props.log.browserVersion.length===1?
                <Box className='accordion-details-wrapper'>
                    <Typography className='accordion-details-browser-label'>browser version:</Typography>
                    <Typography className='accordion-details-browser-content'>{props.log.browserVersion[0]}</Typography>
                </Box>:
                <Accordion className='accordion-container' expanded={browserExpanded === `${props.index}`} onChange={handleChange(`${props.index}`)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`log${props.index}-content`}
                        id={`log${props.index}bh-header`}
                        >
                        <Typography>browser versions:</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {props.log.browserVersion.map((item,index) => {
                                return (
                                        <ListItem key={index}>
                                            <Typography>{item}</Typography>
                                        </ListItem>
                            )})}
                        </List> 
                    </AccordionDetails>           
                </Accordion>}
            </AccordionDetails>
        </Accordion>
    )
}
