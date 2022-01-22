export function getAppointmentsForDay(state, day) {
  const { days, appointments } = state;
  const filteredDay = days.find(item => day === item.name);
  if (days.length < 1 || filteredDay === undefined) {
    return [];
  }
  const daysAppointment = filteredDay.appointments.map(id => appointments[id]);
  return daysAppointment;
}




export function getInterview(state, interview) {
  const { appointments, interviewers } = state;

  if (interview === null) {
    return null;
  }

  const newInterviewData = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }

  return newInterviewData
}





