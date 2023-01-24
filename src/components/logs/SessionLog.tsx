import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/system/Box';
import { SessionViewType, AtomicViewType } from 'frontend-backend';
import AtomicLog from './AtomicLog';

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
        <Accordion sx={{width: '100%'}} expanded={props.expanded === `${props.index}`} onChange={props.changeHandler(`${props.index}`)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`log${props.index}-content`}
                id={`log${props.index}bh-header`}
                sx={{display:'flex', textAlign: {xs:"left",md:"center"}, wordBreak: {xs:"break-all", sm:"break-word"}}}
            >
                <Box sx={{}}>
                    <Typography sx={{width: {xs: "100%", md:'33%'}}}>session: {props.log.sessionId}</Typography>
                    <Typography sx={{width: {xs: "100%", md:'33%'}}}>{props.log.timestamp}</Typography>
                    <Typography sx={{width: {xs: "100%", md:'33%'}}}>total errors: {props.log.totalErrors}</Typography>
                </Box>
            </AccordionSummary>
            <Divider></Divider>
            <AccordionDetails>
                <Box sx={{display:{md:'flex'}, gap:"0.5rem"}}>
                    <Typography sx={{width:"25%"}}>errors:</Typography>
                    <Box sx={{width:"75%"}}>
                        {props.log.errors.map((error: AtomicViewType, index: number) => {
                            return <AtomicLog log={error} index={index} key={index} expanded={errorExpanded} changeHandler={handleChange}/>
                        })}
                    </Box>
                </Box>
            </AccordionDetails>
        </Accordion>
    )
}
