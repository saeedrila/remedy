import { Button, Card, Nav } from 'react-bootstrap';
import { useState } from 'react';

function NavTabsExample() {
  const [activeTab, setActiveTab] =useState('#first')

  const handleTabChange = (eventKey) => {
    console.log('Tab clicked:', eventKey);
    setActiveTab(eventKey)
  };

  return (
    <>
      <Nav variant="tabs" defaultActiveKey={activeTab}>
        <Nav.Item>
          <Nav.Link eventKey='#first' onClick={() => handleTabChange('#first')} >In person</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey='#second' onClick={() => handleTabChange('#second')} >Online</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="mt-3">
        {activeTab === '#first' && (
          <Card>
            <Card.Body>
              <Card.Title>Special title treatment</Card.Title>
              <Card.Text>
                With supporting text below as a natural lead-in to additional content.
              </Card.Text>
            </Card.Body>
          </Card>
        )}
        {activeTab === '#second' && (
          <Card>
            <Card.Body>
              <Card.Title>This is the second tab</Card.Title>
              <Card.Text>
                This is the content of second tab.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        )}
      </div>
    </>
  );
}

export default NavTabsExample;