import { Button, Col, Container, Image, Row } from "react-bootstrap"
import cookie from "react-cookies"

function DatTiecSanhItems(props) {
    const select = () => {
        cookie.save('sanhid', props.id)
        console.info(cookie.load('sanhid'))
        alert(`Bạn đã chọn thành công sảnh ${props.ten}`)
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
                    Số lượng bàn tối đa của sảnh: {props.sl_ban_max}
                    <div dangerouslySetInnerHTML={{__html: props.ghi_chu}}></div>
                    <Button onClick={select} style={{marginTop: "8px"}}>Chọn</Button>
                </Col>
            </Row>
            <hr />
        </Container>
        </> 
    )
}

export default DatTiecSanhItems