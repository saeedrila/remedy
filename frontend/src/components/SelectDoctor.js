import  React, { useState, useEffect } from 'react';
import { 
  Container,
  Card,
  Col,
  Row,
  Button,
  Nav,
} from 'react-bootstrap';

import Header from './Common/Header'
import Footer from './Common/Footer'

import pic1 from '../assets/images/medical/online-doctor.svg'
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';

// Get doctor's list of selected specialization
const DOCTORS_OF_SELECTED_SPECIALIZATION = '/doctors-at-specific-specialization/'
const FETCH_AVAILABLE_TIMING_DOCTOR = 'fetch-available-timing-doctor'

function SelectDoctor() {
  const { specialization_title } = useParams();
  const [doctorList, setDoctorList] =useState([]);
  const [selectedLines, setSelectedLines] = useState([]);
  const [daySelection, setDaySelection] = useState('dayZero');
  


  const fetchTimeSlotDetails = async () => {
  try {

  } catch (error){
    console.error('Error fetching data', error)
  }
  }

  const fetchDoctorListAtSpecialization = async () => {
    try {
      console.log('Specialization_tile stored: ', specialization_title)
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(DOCTORS_OF_SELECTED_SPECIALIZATION, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          title: specialization_title,
        },
      });
      const updatedSpecializations = response.data.map(item => ({
        ...item,
        img: pic1
      }));
      setDoctorList(updatedSpecializations)
      console.log('Doctors list of selected ID: ', response.data )
    } catch (error){
      console.error('Error fetching data', error)
    }
  };
  useEffect(() => {
    fetchDoctorListAtSpecialization();
  }, []);


  const dayZeroDummyData = [
    {
      email: "example1@e.com",
      img: pic1,
      online: [
        {day: "Monday", timings: ["09:00 AM", "09:15 PM"]},
        {day: "Tuesday", timings: ["09:30 AM", "09:45 PM"]},
      ],
      offline: [
        {day: "Wednesday", timings: ["08:00 AM", "08:15 PM"]},
        {day: "Thursday", timings: ["08:30 AM", "08:45 PM"]},
      ]
    },{
      email: "example2@e.com",
      img: pic1,
      online: [
        {day: "Monday", timings: ["10:00 AM", "10:15 PM"]},
        {day: "Tuesday", timings: ["10:30 AM", "10:45 PM"]},
      ],
      offline: [
        {day: "Wednesday", timings: ["11:00 AM", "11:15 PM"]},
        {day: "Thursday", timings: ["11:30 AM", "11:45 PM"]},
      ]
    }, 
  ]

  const [proceedButtonData, setProceedButtonData] = useState(Array(dayZeroDummyData.length).fill({
    email: null,
    date: null,
    line: null,
    time: null,
  }));

  const navigate = useNavigate();

  const handleProceedClick = (proceedDataEmail, proceedDataDate, proceedDataLine, proceedDataTime) => {
    const url = `/doctor-at-specialization/doctor-appointment-confirmation?email=${proceedDataEmail}&date=${proceedDataDate}&line=${proceedDataLine}&time=${proceedDataTime}`;
    navigate(url);
  };

  const handleTimingClick = (selectedTime, selectedDate, selectedLine, selectedEmail, cardIndex) => {
    console.log(`Selected Email: ${selectedEmail} Date: ${selectedDate}, Line: ${selectedLine}, Time: ${selectedTime}`);
    const newProceedButtonData = [...proceedButtonData];
    newProceedButtonData[cardIndex] = {
      email: selectedEmail,
      date: selectedDate,
      line: selectedLine,
      time: selectedTime,
    };
    setProceedButtonData(newProceedButtonData);
  };
  
  console.log('Rendering component');

  return (
    <>
      {/* Header section */}
      <Header />

      <Container className="text-center">
        <Button 
          variant={daySelection ==='dayZero'?'success':'secondary'} 
          className='m-2'
          onClick={()=>setDaySelection('dayZero')}
        >
          dayZero
        </Button>
        <Button 
          variant={daySelection ==='dayOne'?'success':'secondary'} 
          className='m-2'
          onClick={()=>setDaySelection('dayOne')}
        >
          dayOne
        </Button>
        <Button 
          variant={daySelection ==='dayTwo'?'success':'secondary'} 
          className='m-2'
          onClick={()=>setDaySelection('dayTwo')}
        >
          dayTwo
        </Button>
        <Button 
          variant={daySelection ==='dayThree'?'success':'secondary'}  
          className='m-2'
          onClick={()=>setDaySelection('dayThree')}
        >
          dayThree
        </Button>
      </Container>

      <Container>
        <div className="big-card-container">
          <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-center mt-1">
            {dayZeroDummyData.length > 0 ? (dayZeroDummyData.map((doctor, cardIndex) => (
              <Col key={doctor.email}>
                <Card className="border">
                  <Card.Img variant="top" src={doctor.img} />
                  <Card.Body>
                    <Card.Title className="justify-content-center">Dr. {doctor.email}</Card.Title>
                    <Nav variant="tabs">
                      <Nav.Item>
                        <Nav.Link
                          onClick={() => {
                            const updatedSelectedLines = [...selectedLines];
                            updatedSelectedLines[cardIndex] = 'offline';
                            setSelectedLines(updatedSelectedLines);
                          }}            
                          active={selectedLines[cardIndex] === 'offline'}
                          className={selectedLines[cardIndex] === 'offline' ? 'selected' : ''}
                        >
                          Offline
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          onClick={() => {
                            const updatedSelectedLines = [...selectedLines];
                            updatedSelectedLines[cardIndex] = 'online';
                            setSelectedLines(updatedSelectedLines);
                          }}
                          active={selectedLines[cardIndex] === 'online'}
                          className={selectedLines[cardIndex] === 'online' ? 'selected' : ''}
                        >
                          Online
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <div className="mt-3">
                      {doctor[selectedLines[cardIndex]] && doctor[selectedLines[cardIndex]].length > 0 ? (
                        doctor[selectedLines[cardIndex]].map((session, index) => (
                          <div key={index}>
                            {session.timings.map((timing, timeIndex) => (
                              <Button 
                                key={timeIndex} 
                                className='m-1'
                                onClick={() => handleTimingClick(timing, daySelection, selectedLines[cardIndex], doctor.email, cardIndex)}
                              >
                                {timing}
                              </Button>
                            ))}
                          </div>
                        ))
                      ) : (
                        <p>Press Offline/Online to update appointment availability</p>
                      )}
                      {proceedButtonData[cardIndex].time !== null && (
                        <Button
                          variant="success"
                          className="mt-3"
                          onClick={() => handleProceedClick(
                            proceedButtonData[cardIndex].email, 
                            proceedButtonData[cardIndex].date,
                            proceedButtonData[cardIndex].line,
                            proceedButtonData[cardIndex].time,
                          )}
                        >
                          Proceed with {proceedButtonData[cardIndex].time}
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))):(
              <div>
                Loading
              </div>
            )}
          </Row>
        </div>
      </Container>

      {/* Footer section */}
      <Footer />
    </>
  )
}

export default SelectDoctor