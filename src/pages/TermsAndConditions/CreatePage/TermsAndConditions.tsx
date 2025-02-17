import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

const TermsAndConditions = () => {
  return (
    <Container className="my-5 d-flex justify-content-center">
      <Card className="shadow-lg p-4" style={{ maxWidth: "900px" }}>
        <Card.Body>
         <h1> Terms and Conditions</h1>

          <Row className="g-4">
            {[ 
              { title: "1. Introduction", text: "Welcome to our website. By accessing this site, you agree to abide by these terms and conditions. Please read them carefully." },
              { title: "2. Use of the Site", text: "This website is intended for lawful use only. Any unauthorized or illegal activities may result in legal action." },
              { title: "3. Privacy Policy", text: "We respect your privacy. Our <a href='/privacy-policy'>Privacy Policy</a> explains how we collect, use, and protect your personal information." },
              { title: "4. Modifications", text: "We reserve the right to update these terms at any time. Continued use of this site after modifications implies acceptance of the updated terms." },
              { title: "5. Disclaimer", text: "We do not guarantee the accuracy or reliability of information provided on this website. Use it at your own risk." },
              { title: "6. Termination", text: "We may terminate access to this website without notice if you violate these terms and conditions." },
              { title: "7. Contact Us", text: "If you have any questions, please <a href='mailto:support@example.com'>contact us</a>." }
            ].map((section, index) => (
              <Col md={12} key={index} className="mb-3">
                <Card className="shadow-sm">
                  <Row className="g-0">
                    <Col md={4} className="d-flex align-items-center justify-content-center bg-light p-3">
                      <h5 className="text-center">{section.title}</h5>
                    </Col>
                    <Col md={8}>
                      <Card.Body>
                        <p dangerouslySetInnerHTML={{ __html: section.text }}></p>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TermsAndConditions;
