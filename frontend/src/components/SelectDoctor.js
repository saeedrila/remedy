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

  const [timeSlotsOnline, setTimeSlotsOnline] = useState({});
  const [timeSlotsOffline, setTimeSlotsOffline] = useState({});

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

  const DoctorList = [
    {
      "email": "doctor5@g.com",
      "online": [
        {"id": 1, "time": "10:00", "status": "Y"},
        {"id": 2, "time": "10:15", "status": "N"},
        {"id": 3, "time": "10:30", "status": "Y"},
        {"id": 4, "time": "10:45", "status": "Y"},
        {"id": 5, "time": "11:00", "status": "Y"},
        {"id": 6, "time": "11:15", "status": "Y"}
      ],
      "offline": [
        {"id": 1, "time": "10:00", "status": "Y"},
        {"id": 2, "time": "10:15", "status": "N"},
        {"id": 3, "time": "10:30", "status": "Y"},
        {"id": 4, "time": "10:45", "status": "N"},
        {"id": 5, "time": "11:00", "status": "Y"}
      ],
    }, ]

    const dummyData = [
      {
        email: "example1@e.com",
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

  const handleTimingClick = (cardIndex, timing) =>{
    console.log('Clicked handleTimingClick',cardIndex, timing);
    setSelectedTiming((prevSelectedTiming) =>({
      ...prevSelectedTiming,
      [cardIndex]: { cardIndex, timing },
    }));
    
    const newShowProceedButtons = [...showProceedButton];
    newShowProceedButtons[cardIndex] = true;
    setShowProceedButton(newShowProceedButtons);
  }
  
  // Old proceed function
  const handleProceedClick = (cardIndex) => {
    const selectedCardTiming = selectedTiming[cardIndex];

    if (selectedCardTiming){
      console.log('handleProceedClick has been clicked', cardIndex, selectedCardTiming.timing);
      // navigate('doctor-appointment-confirmation',{
      //   state: {
      //     doctor: doctorList[selectedCardTiming.cardIndex].name,
      //     timing: selectedCardTiming.timing,
      //   }
      // });
    }
  };


  const handleDoctorTimeProceedClick = () => {
    navigate('/doctor-at-specialization/doctor-appointment-confirmation',{
      
    });
  }


  return (
    <>
      {/* Header section */}
      <Header />

      <Container>
        <div className="big-card-container">
          <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-center mt-3">
            {doctorList.map((data, cardIndex) => (
              <Col key={data.email}>
                <Card className="border">
                  <Card.Img variant="top" src={data.img} />
                  <Card.Body>
                    <Card.Title className="justify-content-center" >Dr. {data.email}</Card.Title>
                    <Button variant="success" 
                      className="mt-3" 
                      onClick={() => 
                      handleDoctorTimeProceedClick()}
                    >
                    Book Now
                    </Button>
                    <Nav variant="tabs">
                      <Nav.Item>
                      <Nav.Link
                      eventKey={`#${data.email}_online`}
                      active={activeOfflineTabs[cardIndex]}
                      onClick={() => handleTabClick(cardIndex, 0)}
                    >In person</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                      <Nav.Link
                      eventKey={`#${data.email}_offline`}
                      active={activeOnlineTabs[cardIndex]}
                      onClick={() => handleTabClick(cardIndex, 1)}
                    >Online</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <div className="mt-3">
                      {activeOfflineTabs[cardIndex]  && (
                        <Card>
                          <Card.Body>
                            <Card.Title>Select timing:</Card.Title>
                            {Object.keys(data.offline).map((id) => (
                              <Button 
                              key={id} 
                              variant={data.offline[id].status === 'Y' ? 'primary' : 'secondary'} 
                              className='time-selection-button'
                              onClick={() => handleTimingClick(cardIndex, data.offline[id].time)} >{data.offline[id].time}</Button>
                            ))}
                          </Card.Body>
                        </Card>
                      )}
                      {activeOnlineTabs[cardIndex] && (
                        <Card>
                          <Card.Body>
                            <Card.Title>Select timing:</Card.Title>
                            {Object.keys(data.online).map((id) => (
                              <Button 
                              key={id} 
                              variant={data.online[id].status === 'Y' ? 'primary':'secondary'} 
                              className='time-selection-button'
                              onClick={() => handleTimingClick(cardIndex, data.offline[id].time)} >{data.online[id].time}</Button>
                            ))}
                          </Card.Body>
                        </Card>
                      )}
                      {showProceedButton[cardIndex] && (
                        <Button variant="success" 
                        className="mt-3" 
                        onClick={() => 
                        handleProceedClick(
                          cardIndex, 
                          activeOfflineTabs[cardIndex] ? 'Offline' : 'Online', 
                          selectedTiming[cardIndex])}>
                          Proceed with {activeOfflineTabs[cardIndex] ? 'In-person' : 'Online'} consultation at {selectedTiming[cardIndex].timing}
                        </Button>
                      )}
                    </div>
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