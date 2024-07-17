import { Col, Container, Image, Row } from "react-bootstrap"

function MenuItems(props) {
    return (
        <>
        <Container>
            <Row>
                <Col md={6} xs={12}>
                    <Image src={props.image} fluid/>
                </Col>
                <Col md={6} xs={12}>
                    <h2 style={{color: "#826618"}}>{props.ten}</h2>
                    <ul>
                        <li><strong>Khai vị: </strong>{props.khai_vi}</li>
                        <li><strong>Món súp: </strong>{props.mon_sup}</li>
                        <li><strong>Món chính 1: </strong>{props.mon_chinh1}</li>
                        <li><strong>Món chính 2: </strong>{props.mon_chinh2}</li>
                        <li><strong>Món chính 3: </strong>{props.mon_chinh3}</li>
                        <li><strong>Tráng miệng: </strong>{props.trang_mieng}</li>
                    </ul>
                </Col>
            </Row>
            <hr />
        </Container>
        </>
    )
}

export default MenuItems