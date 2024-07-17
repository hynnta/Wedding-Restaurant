import { Col, Container, Image, Row } from "react-bootstrap"

function SanhItems(props) {
    return (
        <>
        <Container>
            <Row>
                <Col md={6} xs={12}>
                    <Image src={props.image} fluid/>
                </Col>
                <Col md={6} xs={12}>
                    <h2 style={{color: "#826618"}}>{props.ten}</h2>
                    Số lượng bàn tối đa của sảnh: {props.sl_ban_max}
                    <div dangerouslySetInnerHTML={{__html: props.ghi_chu}}></div>
                </Col>
            </Row>
            <hr />
        </Container>
        </> 
    )
}

export default SanhItems