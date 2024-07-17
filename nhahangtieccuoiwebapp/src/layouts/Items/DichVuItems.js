import { Col, Container, Image, Row } from "react-bootstrap"

function DichVuItems(props) {
    const numberFormat = (value) => new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);

    return (
        <>
        <Container>
            <Row>
                <Col md={6} xs={12}>
                    <Image src={props.image} fluid/>
                </Col>
                <Col md={6} xs={12}>
                    <h3 style={{color: "#826618"}}>{props.ten}</h3>
                    <h4>Giá: {numberFormat(props.gia)}</h4>
                </Col>
            </Row>
            <hr />
        </Container>
        </>
    )
}

export default DichVuItems