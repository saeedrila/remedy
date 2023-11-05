import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Card,
    Col,
    Row,
} from 'react-bootstrap';



function SmallCard({SmallCardData}) {
  const navigate = useNavigate();

  return (
    <>
      <div className="big-card-container">
        <Row xs={2} sm={3} md={4} lg={5} className="g-4 justify-content-center mt-3">
          {SmallCardData.map((data, idx) => (
            <Col key={idx}>
              <Card className="border text-center hand-cursor"
                onClick={() => {
                  const title = data.specialization_title.replace(/ /g, '-');
                  navigate(`/doctor-at-specialization/${title}`)
                }}
              >
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
