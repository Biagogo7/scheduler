
import React, {useState} from "react";
import "components/Appointment/styles.scss"

import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import Form from "components/Appointment/Form"
import Status from "components/Appointment/Status"

import {getInterviewersForDay} from "components/helpers/selectors"


import useVisualMode from "hooks/useVisualMode"



export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const STATUS = "STATUS"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: [],
  //   interviewers: {}     
  // });

  //
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };    

    transition(STATUS)

    props.bookInterview(props.id, interview)
    .then(() => {
      
      transition(SHOW)
    })   
       
  }

  // console.log("jghkhfhhdfghkj", save());

  // const dailyInterviewers = getInterviewersForDay(state, state.day);  
  // console.log('dailyInter', dailyInterviewers)
  // console.log('state', state)
    // const eachInterviewer = dailyInterviewers.map(interviewer => {
     

    // return (
    //     <Appointment 
    //         key={interviewer.id} 
    //         id={interviewer.id}
    //         name={interviewer.name}
    //         avatar={interviewer.avatar}

    //     />
    //   )
    // });



  return (
    <article className="appointment">
      <Header
        time={props.time}
      />
      
        {/* {props.interview ? <Show student={props.interview.student} name={props.interview.interviewer.name}/> : <Empty />} */}

    
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          name={props.interview.interviewer.name}
        />
      )}
      {mode === CREATE && (
        <Form onCancel={() => back(EMPTY)}
          interviewers={props.interviewers}  
          onSave={save}
        />
      )}
      {mode === STATUS && (
        <Status 
          message={".....Saving"}
        /> 
      )}
               

    </article>
  );

}

