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
        <Accordion sx={{width: '100%'}} expanded={props.expanded === `${props.index}`} onChange={props.changeHandler(`${props.index}`)}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`log${props.index}-content`}
            id={`log${props.index}bh-header`}
            >
                <Typography sx={{ width: '66%', flexGrow: 1 }}>{props.log.name + ': ' + props.log.message}</Typography>
                <Typography sx={{ width: '33%', color: 'text.secondary', flexShrink:0 }}>total errors: {props.log.totalErrors}</Typography>
            </AccordionSummary>
            <Divider></Divider>
            <AccordionDetails>
                <Box sx={{display:{md:'flex'}, gap:"0.5rem"}}>
                    <Typography sx={{width:"50%"}}>stack: {props.log.stack}</Typography>
                    <Typography sx={{width:"50%"}}>total sessions: {props.log.totalSessions}</Typography>
                </Box>
                <Accordion sx={{width: '100%'}} expanded={browserExpanded === `${props.index}`} onChange={handleChange(`${props.index}`)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`log${props.index}-content`}
                        id={`log${props.index}bh-header`}
                        >
                        <Typography>browserVersions:</Typography>
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
                </Accordion>
            </AccordionDetails>
        </Accordion>
    )
}
