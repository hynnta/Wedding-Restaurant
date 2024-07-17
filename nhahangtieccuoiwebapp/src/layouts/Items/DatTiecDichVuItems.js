import { Button, Col, Container, Image, Row } from "react-bootstrap"
import cookie from "react-cookies";

function DatTiecDichVuItems(props) {
    const numberFormat = (value) => new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);

    const select = () => {
        cookie.save('dichvuid', props.id)
        console.info(cookie.load('dichvuid'))
        alert(`Bạn đã chọn thành công dịch vụ ${props.ten}`)
    }

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
                    <Button onClick={select}>Chọn</Button>
                </Col>
            </Row>
            <hr />
        </Container>
        </>
    )
}

export default DatTiecDichVuItems