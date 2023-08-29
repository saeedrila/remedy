import React from 'react';
import { 
    Card,
    Col,
    Row,
} from 'react-bootstrap';


function SmallCard({SmallCardData}) {
  return (
    <>
      <div className="big-card-container">
        <Row xs={2} sm={3} md={4} lg={5} className="g-4 justify-content-center mt-3">
          {SmallCardData.map((data, idx) => (
            <Col key={idx}>
              <Card className="border">
                <Card.Img variant="top" src={data.img} />
                <Card.Body>
                  <Card.Title className="justify-content-center" >{data.title}</Card.Title>
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
