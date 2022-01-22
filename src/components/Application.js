import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import axios from "axios";
import {getAppointmentsForDay, getInterview} from "components/helpers/selectors"




export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {}     
  });

  // let dailyAppointments = [];

  const setDay = day => setState({ ...state, day });
  
  
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),      
      axios.get("http://localhost:8001/api/interviewers")       
      ]).then((all) => {
        // set your states here with the correct values...
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));      
          
      })
  
  }, []);

  const dailyAppointments = getAppointmentsForDay(state, state.day);
    

  const eachAppointment = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

   return (
      <Appointment 
          key={appointment.id} 

          id={appointment.id}
          time={appointment.time}
          interview={interview}

      />
    )
  });

  return (
    <main className="layout">
      <section className="sidebar">
       
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav

          className="sidebar__menu">

          <DayList
            days={state.days}
            spots={state.day.spots}
            value={state.day}
            onChange={setDay}
          />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        
        {eachAppointment}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}



