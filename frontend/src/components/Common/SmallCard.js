import React from 'react';
import { 
    Card,
    Col,
    Row,
} from 'react-bootstrap';

import pic1 from '../../assets/images/medical/medical-prescription-logo.svg'
import pic2 from '../../assets/images/medical/blood-test-logo.svg'


function SmallCard({SmallCardData}) {
  return (
    <>
      <div className="big-card-container">
        <Row xs={2} sm={3} md={4} lg={5} className="g-4 justify-content-center mt-3">
          {SmallCardData.map((data, idx) => (
            <Col key={idx}>
              <Card className="border text-center">
                <Card.Img variant="top" src={data.img} />
                <Card.Body>
                  <Card.Title>{data.specialization_title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default SmallCard;
