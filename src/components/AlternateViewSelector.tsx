import React, { ChangeEvent, useContext } from 'react';
import { ViewType } from 'frontend-backend';
import {StateContext} from '../routes/Main';

const views: ViewType[] = ['atomic', 'session', 'error'];

export default function AlternateViewSelector() {

    const stateContext = useContext(StateContext);
    const {view, changeState} = stateContext;
    
      const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        changeState({...stateContext, view:event.target.value as ViewType});
      };

  return (
    <>
        <label htmlFor="views">Select view:</label>
        <select name="views" defaultValue={view} onChange={handleChange}>
            {views.map((view, index) => {
                return <option key={index}>{view}</option>
            })}
        </select>
    </>
  )
}
