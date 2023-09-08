import React from 'react';
import {
    Container,
    Card,
    Col,
    Row,
} from 'react-bootstrap';


function BigCard({BigCardData}) {
  return (
    <>
      <Container>
        <div className="big-card-container">
          <Row xs={1} md={3} lg={4} className="g-4 justify-content-center mt-3">
            {BigCardData.map((data, idx) => (
              <Col key={idx}>
                <Card>
                  <Card.Img variant="top" src={data.img} />
                  <Card.Body>
                    <Card.Title className="justify-content-center" >{data.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </>
  );
}

export default BigCard;
