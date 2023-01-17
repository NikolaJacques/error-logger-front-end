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
                <Box sx={{ display:"flex", flexDirection:"column", width: '33%', color: 'text.secondary', flexShrink:0 }}>
                    <Typography>total errors: {props.log.totalErrors}</Typography>
                    <Typography>total sessions: {props.log.totalSessions}</Typography>
                </Box>
            </AccordionSummary>
            <Divider></Divider>
            <AccordionDetails>
                <Box sx={{display:{md:'flex'}, gap:"0.5rem", py: "1rem"}}>
                    <Typography sx={{width:"25%"}}>stack:</Typography>
                    <Typography sx={{width:"75%"}}>{props.log.stack}</Typography>
                </Box>
                {props.log.browserVersion.length===1?
                <Box sx={{display:{md:'flex'}, gap:"0.5rem", py: "1rem"}}>
                    <Typography sx={{width:"25%"}}>browser version:</Typography>
                    <Typography sx={{width:"75%"}}>{props.log.browserVersion[0]}</Typography>
                </Box>:
                <Accordion sx={{width: '100%'}} expanded={browserExpanded === `${props.index}`} onChange={handleChange(`${props.index}`)}>
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
