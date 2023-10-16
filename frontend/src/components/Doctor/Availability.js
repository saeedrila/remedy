import React, { useState, useEffect } from 'react'
import axios from '../../api/axios';
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
import { format, addDays } from 'date-fns';
const DOCTOR_AVAILABILITY_GET_URL = 'doctor-availability-get-url'


function Availability() {
  document.title = 'Doctor Dashboard || Availability'
  const [slotsAvailable, setSlotsAvailable] = useState([])

  const [dayZeroOfflineButtons, setDayZeroOfflineButtons] = useState([])
  const [dayOneOfflineButtons, setDayOneOfflineButtons] = useState([])
  const [dayTwoOfflineButtons, setDayTwoOfflineButtons] = useState([])
  const [dayThreeOfflineButtons, setDayThreeOfflineButtons] = useState([])
  const [dayZeroOnlineButtons, setDayZeroOnlineButtons] = useState([])
  const [dayOneOnlineButtons, setDayOneOnlineButtons] = useState([])
  const [dayTwoOnlineButtons, setDayTwoOnlineButtons] = useState([])
  const [dayThreeOnlineButtons, setDayThreeOnlineButtons] = useState([])

  const getSlotsAvailable = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(DOCTOR_AVAILABILITY_GET_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
      });
      setSlotsAvailable(response.data);
      console.log('Response.data: ', response.data)
      console.log('slotsAvailable: ', slotsAvailable)

      console.log('Get slots available Try completed')
    } catch(error) {
      console.log('Get slots available Catch completed')
    }
  }


  useEffect(() => {
    getSlotsAvailable();
  }, []);

  useEffect(() => {
    console.log('slotsAvailable updated:', slotsAvailable);
    // Extract and store time slots for each day
    if (slotsAvailable.length > 0) {
      const dayZeroOfflineSlots = slotsAvailable[0].slots_details_offline;
      const dayZeroOnlineSlots = slotsAvailable[0].slots_details_online;
      const dayOneOfflineSlots = slotsAvailable[1].slots_details_offline;
      const dayOneOnlineSlots = slotsAvailable[1].slots_details_online;
      const dayTwoOfflineSlots = slotsAvailable[2].slots_details_offline;
      const dayTwoOnlineSlots = slotsAvailable[2].slots_details_online;
      const dayThreeOfflineSlots = slotsAvailable[3].slots_details_offline;
      const dayThreeOnlineSlots = slotsAvailable[3].slots_details_online;

      // Day zero button creation
      const dayZeroOfflineButtons = Object.entries(dayZeroOfflineSlots).map(([key, slot]) => (
        <Button 
          key={key} 
          className={
            slot.status === 'notAvailable' ? 'btn-secondary' :
            slot.status === 'available' ? 'btn-success' :
            slot.status === 'updated' ? 'btn-info' : 'btn-danger'
          }
        >
          {slot.time}
        </Button>
      ));
      setDayZeroOfflineButtons(dayZeroOfflineButtons);

      const dayZeroOnlineButtons = Object.entries(dayZeroOnlineSlots).map(([key, slot]) => (
        <Button 
          key={key} 
          className={
            slot.status === 'notAvailable' ? 'btn-secondary' :
            slot.status === 'available' ? 'btn-success' :
            slot.status === 'updated' ? 'btn-info' : 'btn-danger'
          }
        >
          {slot.time}
        </Button>
      ));
      setDayZeroOnlineButtons(dayZeroOnlineButtons);
            
      // Day one button creation
      const dayOneOfflineButtons = Object.entries(dayOneOfflineSlots).map(([key, slot]) => (
        <Button 
          key={key} 
          className={
            slot.status === 'notAvailable' ? 'btn-secondary' :
            slot.status === 'available' ? 'btn-success' :
            slot.status === 'updated' ? 'btn-info' : 'btn-danger'
          }
        >
          {slot.time}
        </Button>
      ));
      setDayOneOfflineButtons(dayOneOfflineButtons);

      const dayOneOnlineButtons = Object.entries(dayOneOnlineSlots).map(([key, slot]) => (
        <Button 
          key={key} 
          className={
            slot.status === 'notAvailable' ? 'btn-secondary' :
            slot.status === 'available' ? 'btn-success' :
            slot.status === 'updated' ? 'btn-info' : 'btn-danger'
          }
        >
          {slot.time}
        </Button>
      ));
      setDayOneOnlineButtons(dayOneOnlineButtons);
            
      // Day two button creation
      const dayTwoOfflineButtons = Object.entries(dayTwoOfflineSlots).map(([key, slot]) => (
        <Button 
          key={key} 
          className={
            slot.status === 'notAvailable' ? 'btn-secondary' :
            slot.status === 'available' ? 'btn-success' :
            slot.status === 'updated' ? 'btn-info' : 'btn-danger'
          }
        >
          {slot.time}
        </Button>
      ));
      setDayTwoOfflineButtons(dayTwoOfflineButtons);

      const dayTwoOnlineButtons = Object.entries(dayTwoOnlineSlots).map(([key, slot]) => (
        <Button 
          key={key} 
          className={
            slot.status === 'notAvailable' ? 'btn-secondary' :
            slot.status === 'available' ? 'btn-success' :
            slot.status === 'updated' ? 'btn-info' : 'btn-danger'
          }
        >
          {slot.time}
        </Button>
      ));
      setDayTwoOnlineButtons(dayTwoOnlineButtons);
            
      // Day three button creation
      const dayThreeOfflineButtons = Object.entries(dayThreeOfflineSlots).map(([key, slot]) => (
        <Button 
          key={key} 
          className={
            slot.status === 'notAvailable' ? 'btn-secondary' :
            slot.status === 'available' ? 'btn-success' :
            slot.status === 'updated' ? 'btn-info' : 'btn-danger'
          }
        >
          {slot.time}
        </Button>
      ));
      setDayThreeOfflineButtons(dayThreeOfflineButtons);

      const dayThreeOnlineButtons = Object.entries(dayThreeOnlineSlots).map(([key, slot]) => (
        <Button 
          key={key} 
          className={
            slot.status === 'notAvailable' ? 'btn-secondary' :
            slot.status === 'available' ? 'btn-success' :
            slot.status === 'updated' ? 'btn-info' : 'btn-danger'
          }
        >
          {slot.time}
        </Button>
      ));
      setDayThreeOnlineButtons(dayThreeOnlineButtons);
    }
  }, [slotsAvailable]);

  // Today's date
  const currentDate = new Date();
  const formattedTodaysDate = format(currentDate, 'yyyy-MM-dd');
  // Tomorrow's date
  const tomorrowDate = addDays(currentDate, 1);
  const formattedTomorrowDate = format(tomorrowDate, 'yyyy-MM-dd');
  // Day after tomorrow's date
  const dayAfterTomorrowDate = addDays(currentDate, 2);
  const formattedDayAfterTomorrowDate = format(dayAfterTomorrowDate, 'yyyy-MM-dd');
  // Second day after tomorrow's date
  const secondDayAfterTomorrowDate = addDays(currentDate, 3);
  const formattedSecondDayAfterTomorrowDate = format(secondDayAfterTomorrowDate, 'yyyy-MM-dd');



  return (
    <>
      <Row>
        <Col>
          <Card>
            <CardTitle className='text-center'>
            Color codes
            </CardTitle>
            <CardBody>
              <div className="d-flex flex-wrap gap-2">
              <Button className={'btn-secondary'}>Slot not available for public</Button>
              <Button className={'btn-success'}>Slot available for public</Button>
              <Button className={'btn-warning'}>Slot has been booked</Button>
              <Button className={'btn-info'}>Slot just updated</Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/* DayZero */}
      <Row>
        <Col sm={6}>
          <Card>
            <CardTitle className='text-center'>
              Today: {formattedTodaysDate} (Online)
            </CardTitle>
            <CardBody>
              <div className="d-flex flex-wrap gap-2">
                {dayZeroOnlineButtons}
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col sm={6}>
          <Card>
            <CardTitle className='text-center'>
            Today: {formattedTodaysDate} (Offline)
            </CardTitle>
            <CardBody>
              <div className="d-flex flex-wrap gap-2">
                {dayZeroOfflineButtons}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/* DayOne */}
      <Row>
        <Col sm={6}>
          <Card>
            <CardTitle className='text-center'>
              Tomorrow: {formattedTomorrowDate} (Online)
            </CardTitle>
            <CardBody>
              <div className="d-flex flex-wrap gap-2">
                {dayOneOnlineButtons}
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col sm={6}>
          <Card>
            <CardTitle className='text-center'>
              Tomorrow: {formattedTomorrowDate} (Offline)
            </CardTitle>
            <CardBody>
              <div className="d-flex flex-wrap gap-2">
              {dayOneOfflineButtons}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/* DayTwo */}
      <Row>
        <Col sm={6}>
          <Card>
            <CardTitle className='text-center'>
              Day after Tomorrow: {formattedDayAfterTomorrowDate} (Online)
            </CardTitle>
            <CardBody>
              <div className="d-flex flex-wrap gap-2">
              {dayTwoOnlineButtons}
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col sm={6}>
          <Card>
            <CardTitle className='text-center'>
            Day after Tomorrow: {formattedDayAfterTomorrowDate} (Offline)
            </CardTitle>
            <CardBody>
              <div className="d-flex flex-wrap gap-2">
              {dayTwoOfflineButtons}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/* DayThree */}
      <Row>
        <Col sm={6}>
          <Card>
            <CardTitle className='text-center'>
            2nd day after Tomorrow: {formattedSecondDayAfterTomorrowDate} (Online)
            </CardTitle>
            <CardBody>
              <div className="d-flex flex-wrap gap-2">
              {dayThreeOnlineButtons}
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col sm={6}>
          <Card>
            <CardTitle className='text-center'>
              2nd day after Tomorrow: {formattedSecondDayAfterTomorrowDate} (Offline)
            </CardTitle>
            <CardBody>
              <div className="d-flex flex-wrap gap-2">
              {dayThreeOfflineButtons}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

    </>
  )
}

export default Availability