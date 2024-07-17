import { Button, Col, Container, Image, Row } from "react-bootstrap"
import cookie from "react-cookies"

const DatTiecMenuItems = (props) => {
    const select = () => {
        cookie.save('menuid', props.id)
        console.info(cookie.load('menuid'))
        alert(`Bạn đã chọn thành công menu ${props.ten}`)
    }

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
                        <li>{props.khai_vi}</li>
                        <li>{props.mon_sup}</li>
                        <li>{props.mon_chinh1}</li>
                        <li>{props.mon_chinh2}</li>
                        <li>{props.mon_chinh3}</li>
                        <li>{props.trang_mieng}</li>
                    </ul>
                    <Button onClick={select} style={{marginTop: "8px"}}>Chọn</Button>
                </Col>
            </Row>
            <hr />
        </Container>
        </>
    )
}

export default DatTiecMenuItems