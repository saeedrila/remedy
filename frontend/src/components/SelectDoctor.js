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
  const [selectedLines, setSelectedLines] = useState({})

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
          {day: "Monday", timings: ["09:00 AM", "02:00 PM"]},
          {day: "Tuesday", timings: ["10:00 AM", "03:00 PM"]},
        ],
        offline: [
          {day: "Wednesday", timings: ["08:00 AM", "01:00 PM"]},
          {day: "Thursday", timings: ["09:30 AM", "02:30 PM"]},
        ]
      },{
        email: "example2@e.com",
        img: pic1,
        online: [
          {day: "Monday", timings: ["09:00 AM", "02:00 PM"]},
          {day: "Tuesday", timings: ["10:00 AM", "03:00 PM"]},
        ],
        offline: [
          {day: "Wednesday", timings: ["08:00 AM", "01:00 PM"]},
          {day: "Thursday", timings: ["09:30 AM", "02:30 PM"]},
        ]
      }, ]

  const navigate = useNavigate();

  const[selectedTiming, setSelectedTiming] = useState({});
  const[showProceedButton, setShowProceedButton] = useState(new Array(doctorList.length).fill(false));

  const [activeOfflineTabs, setActiveOfflineTabs] = useState(new Array(doctorList.length).fill(false));
  const [activeOnlineTabs, setActiveOnlineTabs] = useState(new Array(doctorList.length).fill(false));
  const [activeCardIndex, setActiveCardIndex] = useState(null);

  const handleTabClick = (cardIndex, tabIndex) => {
    const newActiveOfflineTabs = [...activeOfflineTabs];
    const newActiveOnlineTabs = [...activeOnlineTabs];

    if (activeCardIndex !== cardIndex){
      newActiveOfflineTabs[activeCardIndex] = false;
      newActiveOnlineTabs[activeCardIndex] = false;
    }

    if (tabIndex === 0) {
      newActiveOfflineTabs[cardIndex] = !newActiveOfflineTabs[cardIndex];
      newActiveOnlineTabs[cardIndex] = false;
    } else if (tabIndex === 1) {
      newActiveOnlineTabs[cardIndex] = !newActiveOnlineTabs[cardIndex];
      newActiveOfflineTabs[cardIndex] = false;
    }

    setActiveOfflineTabs(newActiveOfflineTabs);
    setActiveOnlineTabs(newActiveOnlineTabs);
    setActiveCardIndex(cardIndex);

    setSelectedTiming({});
    setShowProceedButton(new Array(doctorList.length).fill(false));
  }
  
  // Old proceed function
  const handleProceedClick = (doctor, cardIndex) => {

  };


  const handleTimingClick = (selectedTime, selectedDate, selectedLine) => {
    console.log(`Selected Date: ${selectedDate}, Line: ${selectedLine}, Time: ${selectedTime}`);
  };
  


  return (
    <>
      {/* Header section */}
      <Header />

      <Container>
        <Button>
          dayZero
        </Button>
        <Button>
          dayOne
        </Button>
        <Button>
          dayTwo
        </Button>
        <Button>
          dayThree
        </Button>
      </Container>

      <Container>
        <div className="big-card-container">
          <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-center mt-3">
            {dayZeroDummyData.map((doctor, cardIndex) => (
              <Col key={doctor.email}>
                <Card className="border">
                  <Card.Img variant="top" src={doctor.img} />
                  <Card.Body>
                    <Card.Title className="justify-content-center">Dr. {doctor.email}</Card.Title>
                    <Nav variant="tabs">
                      <Nav.Item>
                        <Nav.Link
                          onClick={() => {
                            const newSelectedLines = [...selectedLines];
                            newSelectedLines[cardIndex] = 'offline';
                            setSelectedLines(newSelectedLines);
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
                            const newSelectedLines = [...selectedLines];
                            newSelectedLines[cardIndex] = 'online';
                            setSelectedLines(newSelectedLines);
                          }}
                          active={selectedLines[cardIndex] === 'online'}
                          className={selectedLines[cardIndex] === 'online' ? 'selected' : ''}
                        >
                          Online
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    {/* <div className="mt-3">
                      {doctor[selectedLines[cardIndex]].map((session, index) => (
                        <div key={index}>
                          {session.timings.map((timing, timeIndex) => (
                            <Button key={timeIndex} onClick={() => handleTimingClick(timing)}>
                              {timing}
                            </Button>
                          ))}
                        </div>
                      ))}
                      {doctor.showProceedButton && (
                        <Button
                          variant="success"
                          className="mt-3"
                          onClick={() => handleProceedClick(doctor, cardIndex)}
                        >
                          Proceed with {selectedLines[cardIndex] === "offline" ? 'Offline' : 'Online'} consultation
                          at {doctor.selectedTiming.time}
                        </Button>
                      )}
                    </div> */}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Container>

      {/* Footer section */}
      <Footer />
    </>
  )
}

export default SelectDoctor