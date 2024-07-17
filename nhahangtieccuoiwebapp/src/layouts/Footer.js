import React from 'react'
import { Alert, Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
    return (
        <>
        <Alert variant="secondary" >
            <Container>
                <Row>
                    <Col>
                        <h2><strong>Nhà hàng tiệc cưới</strong></h2>
                        <h6>Nguyễn Anh Tuấn &copy; 2022</h6>
                    </Col>
                    <Col>
                        <h4>LIÊN HỆ</h4>
                        <p>Hotline:</p>
                        <p>Email: </p>
                        <p>Địa chỉ: </p>
                    </Col>
                </Row>
            </Container>
        </Alert>
        </> 
    )
}

export default Footer