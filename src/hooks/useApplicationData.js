import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {



  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {}
  });


  const setDay = day => setState({ ...state, day });


  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((all) => {
     
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));

    })

  }, []);


  function updateSpots (requestType) {
    const days = state.days.map(day => {
      
      if (day.name === state.day) {
        if (requestType === "bookAppointment") {
          return { ...day, spots: day.spots - 1 }
        } else {
          return { ...day, spots: day.spots + 1 }
        }
      } else {
        return {...day}
      }
    })
    return days;
  }


  //bookinterview function
  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      // interview: { ...interview }
    };

    const existingInterview = appointment.interview
    appointment.interview = { ...interview }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    let days = [ ...state.days ]

    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {

        if ( !existingInterview ) {
          days = updateSpots("bookAppointment")
        }
        
          setState({ ...state, appointments, days })           
       
      })
  }


  function cancelInterview(id, interview) {
 
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        const days = updateSpots()
        setState({ ...state, appointments, days });

     
      })

  }


  return { state, setDay, bookInterview, cancelInterview };
};