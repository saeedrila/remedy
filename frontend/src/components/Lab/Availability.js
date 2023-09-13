import React from 'react'
import {
  Button,
  Row,
  Col,
  Card,
} from 'react-bootstrap'
import {
  CardTitle,
  CardBody,

} from 'reactstrap'

function Availability() {

  const todayAvailabilityButtons = [];
  const tomorrowAvailabilityButtons = [];
  const dayAfterTomorrowAvailabilityButtons = [];
  const secondDayAfterTomorrowAvailabilityButtons = [];

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
    const todayAvailabilityColor = getRandomColor();
    const tomorrowAvailabilityColor = getRandomColor();
    const dayAfterTomorrowAvailabilityColor = getRandomColor();
    const secondDayAfterTomorrowAvailabilityColor = getRandomColor();

    todayAvailabilityButtons.push(
      <Button key={id} color={todayAvailabilityColor} className={`btn btn-${todayAvailabilityColor} waves-effect waves-light`}>
        {timeString}
      </Button>
    );

    tomorrowAvailabilityButtons.push(
      <Button key={id} color={tomorrowAvailabilityColor} className={`btn btn-${tomorrowAvailabilityColor} waves-effect waves-light`}>
        {timeString}
      </Button>
    );

    dayAfterTomorrowAvailabilityButtons.push(
      <Button key={id} color={dayAfterTomorrowAvailabilityColor} className={`btn btn-${dayAfterTomorrowAvailabilityColor} waves-effect waves-light`}>
        {timeString}
      </Button>
    );

    secondDayAfterTomorrowAvailabilityButtons.push(
      <Button key={id} color={secondDayAfterTomorrowAvailabilityColor} className={`btn btn-${secondDayAfterTomorrowAvailabilityColor} waves-effect waves-light`}>
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
                {todayAvailabilityButtons}
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
                {tomorrowAvailabilityButtons}
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
                {dayAfterTomorrowAvailabilityButtons}
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
                {secondDayAfterTomorrowAvailabilityButtons}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Availability