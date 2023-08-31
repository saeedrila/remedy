import React from 'react'
import { useState } from 'react';
import { 
  Card,
  Col,
  Row,
  Button,
  Nav,
} from 'react-bootstrap';

import Header from './Common/Header'
import Footer from './Common/Footer'

import pic1 from '../assets/images/medical/online-doctor.svg'
import { useNavigate } from 'react-router-dom';



function SelectDoctor() {
  const DoctorList = [
    {
      "name": "Barny Crosthwaite",
      "fee": 300,
      "online": [
        {"id": 1, "time": "10:00", "status": "Y"},
        {"id": 2, "time": "10:15", "status": "N"},
        {"id": 3, "time": "10:30", "status": "Y"},
        {"id": 4, "time": "10:45", "status": "Y"},
        {"id": 5, "time": "11:00", "status": "Y"},
        {"id": 6, "time": "11:15", "status": "Y"}
      ],
      "inPerson": [
        {"id": 1, "time": "10:00", "status": "Y"},
        {"id": 2, "time": "10:15", "status": "N"},
        {"id": 3, "time": "10:30", "status": "Y"},
        {"id": 4, "time": "10:45", "status": "N"},
        {"id": 5, "time": "11:00", "status": "Y"}
      ],
      "img": pic1,
    }, {
      "name": "Benedikt Whitwham",
      "fee": 400,
      "online": [
        {"id": 1, "time": "10:00", "status": "Y"},
        {"id": 2, "time": "10:15", "status": "N"},
        {"id": 3, "time": "10:30", "status": "Y"},
        {"id": 4, "time": "10:45", "status": "Y"},
        {"id": 5, "time": "11:00", "status": "Y"},
        {"id": 6, "time": "11:15", "status": "Y"}
      ],
      "inPerson": [
        {"id": 1, "time": "10:00", "status": "Y"},
        {"id": 2, "time": "10:15", "status": "Y"},
        {"id": 3, "time": "10:30", "status": "Y"},
        {"id": 4, "time": "10:45", "status": "Y"},
        {"id": 5, "time": "11:00", "status": "Y"},
        {"id": 6, "time": "11:15", "status": "Y"}
      ],
      "img": pic1,
    }, {
      "name": "Duffie Scobbie",
      "fee": 350,
      "online": [
        {"id": 1, "time": "10:00", "status": "Y"},
        {"id": 2, "time": "10:15", "status": "N"},
        {"id": 3, "time": "10:30", "status": "Y"},
        {"id": 4, "time": "10:45", "status": "Y"},
        {"id": 5, "time": "11:00", "status": "Y"},
        {"id": 6, "time": "11:15", "status": "Y"}
      ],
      "inPerson": [
        {"id": 1, "time": "10:00", "status": "Y"},
        {"id": 2, "time": "10:15", "status": "Y"},
        {"id": 3, "time": "10:30", "status": "Y"},
        {"id": 4, "time": "10:45", "status": "Y"},
        {"id": 5, "time": "11:00", "status": "Y"},
        {"id": 6, "time": "11:15", "status": "Y"}
      ],
      "img": pic1,
    }, {
      "name": "Helen Maceur",
      "fee": 400,
      "online": [
        {"id": 1, "time": "10:00", "status": "Y"},
        {"id": 2, "time": "10:15", "status": "N"},
        {"id": 3, "time": "10:30", "status": "Y"},
        {"id": 4, "time": "10:45", "status": "Y"},
        {"id": 5, "time": "11:00", "status": "Y"},
        {"id": 6, "time": "11:15", "status": "Y"}
      ],
      "inPerson": [
        {"id": 1, "time": "10:00", "status": "Y"},
        {"id": 2, "time": "10:15", "status": "Y"},
        {"id": 3, "time": "10:30", "status": "Y"},
        {"id": 4, "time": "10:45", "status": "Y"},
        {"id": 5, "time": "11:00", "status": "Y"},
        {"id": 6, "time": "11:15", "status": "Y"}
      ],
      "img": pic1,
    }, {
      "name": "Ethyl Beazley",
      "fee": 400,
      "online": [
        {"id": 1, "time": "10:00", "status": "Y"},
        {"id": 2, "time": "10:15", "status": "N"},
        {"id": 3, "time": "10:30", "status": "Y"},
        {"id": 4, "time": "10:45", "status": "Y"},
        {"id": 5, "time": "11:00", "status": "Y"},
        {"id": 6, "time": "11:15", "status": "Y"}
      ],
      "inPerson": [
        {"id": 1, "time": "10:00", "status": "Y"},
        {"id": 2, "time": "10:15", "status": "Y"},
        {"id": 3, "time": "10:30", "status": "Y"},
        {"id": 4, "time": "10:45", "status": "Y"},
        {"id": 5, "time": "11:00", "status": "Y"},
        {"id": 6, "time": "11:15", "status": "Y"}
      ],
      "img": pic1,
    }]

  const navigate = useNavigate();

  const[selectedTiming, setSelectedTiming] = useState({});
  const[showProceedButton, setShowProceedButton] = useState(new Array(DoctorList.length).fill(false));

  const [activeInpersonTabs, setActiveInpersonTabs] = useState(new Array(DoctorList.length).fill(false));
  const [activeOnlineTabs, setActiveOnlineTabs] = useState(new Array(DoctorList.length).fill(false));
  const [activeCardIndex, setActiveCardIndex] = useState(null);

  const handleTabClick = (cardIndex, tabIndex) => {
    const newActiveInpersonTabs = [...activeInpersonTabs];
    const newActiveOnlineTabs = [...activeOnlineTabs];

    if (activeCardIndex !== cardIndex){
      newActiveInpersonTabs[activeCardIndex] = false;
      newActiveOnlineTabs[activeCardIndex] = false;
    }

    if (tabIndex === 0) {
      newActiveInpersonTabs[cardIndex] = !newActiveInpersonTabs[cardIndex];
      newActiveOnlineTabs[cardIndex] = false;
    } else if (tabIndex === 1) {
      newActiveOnlineTabs[cardIndex] = !newActiveOnlineTabs[cardIndex];
      newActiveInpersonTabs[cardIndex] = false;
    }

    setActiveInpersonTabs(newActiveInpersonTabs);
    setActiveOnlineTabs(newActiveOnlineTabs);
    setActiveCardIndex(cardIndex);

    setSelectedTiming({});
    setShowProceedButton(new Array(DoctorList.length).fill(false));
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
  

  const handleProceedClick = (cardIndex) => {
    const selectedCardTiming = selectedTiming[cardIndex];

    if (selectedCardTiming){
      console.log('handleProceedClick has been clicked', cardIndex, selectedCardTiming.timing);
      navigate('doctor-appointment-confirmation',{
        state: {
          doctor: DoctorList[selectedCardTiming.cardIndex].name,
          timing: selectedCardTiming.timing,
        }
      });
    }
  };


  return (
    <>
      {/* Header section */}
      <Header />

      <div className="big-card-container">
        <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-center mt-3">
          {DoctorList.map((data, cardIndex) => (
            <Col key={data.name}>
              <Card className="border">
                <Card.Img variant="top" src={data.img} />
                <Card.Body>
                  <Card.Title className="justify-content-center" >Dr. {data.name}</Card.Title>
                  <Card.Title className="justify-content-center" >₹{data.fee}</Card.Title>
                  <Nav variant="tabs">
                    <Nav.Item>
                    <Nav.Link
                    eventKey={`#${data.name}_online`}
                    active={activeInpersonTabs[cardIndex]}
                    onClick={() => handleTabClick(cardIndex, 0)}
                  >In person</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link
                    eventKey={`#${data.name}_inPerson`}
                    active={activeOnlineTabs[cardIndex]}
                    onClick={() => handleTabClick(cardIndex, 1)}
                  >Online</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <div className="mt-3">
                    {activeInpersonTabs[cardIndex]  && (
                      <Card>
                        <Card.Body>
                          <Card.Title>Select timing:</Card.Title>
                          {Object.keys(data.inPerson).map((id) => (
                            <Button 
                            key={id} 
                            variant={data.inPerson[id].status === 'Y' ? 'primary' : 'secondary'} 
                            className='time-selection-button'
                            onClick={() => handleTimingClick(cardIndex, data.inPerson[id].time)} >{data.inPerson[id].time}</Button>
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
                            onClick={() => handleTimingClick(cardIndex, data.inPerson[id].time)} >{data.online[id].time}</Button>
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
                        activeInpersonTabs[cardIndex] ? 'Inperson' : 'Online', 
                        selectedTiming[cardIndex])}>
                        Proceed with {activeInpersonTabs[cardIndex] ? 'In-person' : 'Online'} consultation at {selectedTiming[cardIndex].timing}
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Footer section */}
      <Footer />
    </>
  )
}

export default SelectDoctor