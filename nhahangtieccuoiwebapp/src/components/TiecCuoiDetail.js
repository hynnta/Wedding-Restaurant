import { useContext, useEffect, useState } from "react"
import { Alert, Badge, Button, Col, Container, Form, Row, Spinner } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import Apis, { authApi, endpoints } from "../configs/Apis"
import { UserContext } from "../App"
import Moment from "react-moment"
import ColoredLine from "../layouts/ColoredLine"

const TiecCuoiDetail = () => {
    const { tieccuoiId } = useParams()
    const [tieccuoi, setTiecCuoi] = useState(null)
    const [user] = useContext(UserContext)
    const [reports, setReports] = useState([])
    const [content, setContent] = useState()

    useEffect(() => {
        const loadTiecCuoiById = async () => {
            let res;
            if (user !== null) {
                res = await authApi().get((endpoints['tieccuoi-detail'](tieccuoiId)))
            } else {
                res = await Apis.get(endpoints['tieccuoi-detail'](tieccuoiId))
            }

            console.info(res.data)

            setTiecCuoi(res.data)
        }

        loadTiecCuoiById()
    }, [])

    useEffect(() => {
        const loadReports = async () => {
            const res = await Apis.get(endpoints['tieccuoi-reports'](tieccuoiId))
            setReports(res.data)
        }

        loadReports()
    }, [reports])

    const addReports = async (event) => {
        event.preventDefault()
    
        const res = await authApi().post(endpoints['reports'], {
            'content': content,
            'tieccuoi': tieccuoiId,
            'user': user.id
        })
        console.info(res.data)
        setReports([...reports, res.data])
    }

    if (tieccuoi === null)
        return <Spinner animation="border" />

    let rp = <><em><Link to="/login">ĐĂNG NHẬP</Link> ĐỂ CÓ THỂ PHẢN HỒI TIỆC</em></>
    if (user !== null && user !== undefined) {
        rp = <>
            <Col>
                <Form onSubmit={addReports}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Phản hồi</Form.Label>
                        <Form.Control type="text" value={content} onChange={(evt) => setContent(evt.target.value)} 
                                                placeholder=" Nhập phản hồi của bạn..." />
                    </Form.Group>
                    <Button type="submit" variant="primary">Thêm phản hồi</Button>
                </Form>
            </Col>
        </>
    }

    return (
        <Container style={{marginTop: "10px"}}>
            <h2 className="text-danger text-center">CHI TIẾT TIỆC CƯỚI</h2>
            <ColoredLine color="red" />
            <Row className="text-center">
                <Col md={4} xs={12}>
                    <h3>Chú rể</h3>
                </Col>
                <Col md={4} xs={12}>
                    <h3><Moment format="DD/MM/YYYY" locale="vi">{tieccuoi.ngay_to_chuc}</Moment></h3>
                </Col>
                <Col md={4} xs={12}>
                    <h3>Cô dâu</h3>
                </Col>
            </Row>
            <Row className="text-center">
                <Col md={4} xs={12}>
                    <h3>{tieccuoi.ten_chu_re}</h3>
                </Col>
                <Col md={4} xs={12}>
                    <h3><Moment format="HH:mm" locale="vi">{tieccuoi.ngay_to_chuc}</Moment></h3>
                </Col>
                <Col md={4} xs={12}>
                    <h3>{tieccuoi.ten_co_dau}</h3>
                </Col>
            </Row>

            <Alert variant='secondary'>
                <Row>
                    <Col md={6} xs={12}>
                        <h4>Số lượng bàn: {tieccuoi.sl_ban}</h4>
                        <h4>Dịch vụ</h4>
                        {tieccuoi.dichvus.map(t => <h5><Badge pill style={{backgroundColor: "blue",marginRight:"5px"}} bg="success">{t.ten}</Badge></h5>)}
                    </Col>
                    <Col md={6} xs={12}>
                        <h4>Menu {tieccuoi.menu.ten}</h4>
                        <MenuForm label="Khai vị" name={tieccuoi.menu.khai_vi}/>
                        <MenuForm label="Món súp" name={tieccuoi.menu.mon_sup}/>
                        <MenuForm label="Món chính 1" name={tieccuoi.menu.mon_chinh1}/>
                        <MenuForm label="Món chính 2" name={tieccuoi.menu.mon_chinh2}/>
                        <MenuForm label="Món chính 3" name={tieccuoi.menu.mon_chinh3}/>
                        <MenuForm label="Tráng miệng" name={tieccuoi.menu.trang_mieng}/>
                    </Col>
                </Row>
            </Alert>

            <Row>
                {rp}
            </Row>

            <Row>
                <Col>
                    <ul>
                        {reports.map(c => <li key={c.id}>{c.content} - <Moment fromNow>{c.created_date}</Moment></li>)}
                    </ul>
                </Col>
            </Row>
            
        </Container>
    )
}

export default TiecCuoiDetail

function MenuForm(props) {
    return (
        <Row>
            <Col>{props.label}</Col>
            <Col>{props.name}</Col>
            <Col></Col>
        </Row>
    )
}