import React from 'react'
import {
  Button,
  Row,
  Col,
  Card,
} from 'react-bootstrap'
import {
  CardBody,
  CardTitle,
} from 'reactstrap'

function Appointments() {
  const todayAppointmentButtons = [];
  const tomorrowAppointmentButtons = [];
  const dayAfterTomorrowAppointmentButtons = [];
  const secondDayAfterTomorrowAppointmentButtons = [];

  const startTime = new Date();
  startTime.setHours(9, 0, 0);

  const endTime = new Date();
  endTime.setHours(17, 30, 0);

  const getRandomColor = () => {
    const colors = ['success', 'secondary'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  while (startTime <= endTime){
    const timeString = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const id = `button-${timeString.replace(':', '-')}`;
    const todayColor = getRandomColor();
    const tomorrowColor = getRandomColor();
    const dayAfterTomorrowColor = getRandomColor();
    const secondDayAfterTomorrowColor = getRandomColor();

    todayAppointmentButtons.push(
      <Button key={id} color={todayColor} className={`btn btn-${todayColor} waves-effect waves-light`}>
        {timeString}
      </Button>
    );

    tomorrowAppointmentButtons.push(
      <Button key={id} color={tomorrowColor} className={`btn btn-${tomorrowColor} waves-effect waves-light`}>
        {timeString}
      </Button>
    );

    dayAfterTomorrowAppointmentButtons.push(
      <Button key={id} color={dayAfterTomorrowColor} className={`btn btn-${dayAfterTomorrowColor} waves-effect waves-light`}>
        {timeString}
      </Button>
    );

    secondDayAfterTomorrowAppointmentButtons.push(
      <Button key={id} color={secondDayAfterTomorrowColor} className={`btn btn-${secondDayAfterTomorrowColor} waves-effect waves-light`}>
        {timeString}
      </Button>
    );
    startTime.setMinutes(startTime.getMinutes() + 15);
  }

  
  return (
    <>
      <Row>
        <Col sm={6}>
          <Card>
            <CardTitle className='text-center'>
              Today
            </CardTitle>
            <CardBody>
              <div className="d-flex flex-wrap gap-2">
                {todayAppointmentButtons}
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col sm={6}>
          <Card>
            <CardTitle className='text-center'>
              Tomorrow
            </CardTitle>
            <CardBody>
              <div className="d-flex flex-wrap gap-2">
                {tomorrowAppointmentButtons}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <Card>
            <CardTitle className='text-center'>
              Day after Tomorrow
            </CardTitle>
            <CardBody>
              <div className="d-flex flex-wrap gap-2">
                {dayAfterTomorrowAppointmentButtons}
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col sm={6}>
          <Card>
            <CardTitle className='text-center'>
              2nd day after Tomorrow
            </CardTitle>
            <CardBody>
              <div className="d-flex flex-wrap gap-2">
                {secondDayAfterTomorrowAppointmentButtons}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Appointments