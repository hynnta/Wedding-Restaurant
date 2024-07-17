import { memo } from "react"
import { Button, Card, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Moment from "react-moment"

const TiecItems = (props) => {
    const nav = useNavigate()

    const goToLesson = () => {
        nav(`/tieccuoi/${props.id}`)
    }

    return (
        <Col lg={4} xs={12}>
            <Card style={{marginBottom: "20px", width: '22rem'}}>
            <Card.Body>
                <Card.Title style={{color: "#826618"}}>Tiệc cưới</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{props.ten_chu_re} - {props.ten_co_dau}</Card.Subtitle>
                <Card.Text>Số lượng bàn: {props.sl_ban}
                <div>Ngày tổ chức: <Moment format="HH:mm - DD/MM/YYYY" locale="vi">{props.ngay_to_chuc}</Moment></div>
                </Card.Text>
                <Button variant="primary" onClick={goToLesson}>Report</Button>
            </Card.Body>
            </Card>
        </Col>
    )
}

export default memo(TiecItems)  