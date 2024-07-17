import { useEffect, useState } from "react"
import { Button, ButtonGroup, Col, Container, Form, FormControl, Row, Spinner } from "react-bootstrap"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import Apis, { endpoints } from "../configs/Apis"
import ColoredLine from "../layouts/ColoredLine"
import SanhItems from "../layouts/Items/SanhItems"

function Sanh() {
    const [loaiSanhs, setLoaiSanhs] = useState([])
    const [sanhs, setSanhs] = useState([])
    const [kw, setKw] = useState("")
    const [q] = useSearchParams()
    const nav = useNavigate()
    const [prev, setPrev] = useState(false)
    const [next, setNext] = useState(false)
    const [page, setPage] = useState(1)

    useEffect(() => {
        let loadLoaiSanhs = async () => {
            let res = await Apis.get(endpoints['loaisanhs'])
            setLoaiSanhs(res.data)
        }

        loadLoaiSanhs()
    }, [])

    useEffect(() => {
        let loadSanhs = async () => {
            let query = ""

            let loaiId = q.get("loai_id")
            if (loaiId !== null)
                query += `?loai_id=${loaiId}`

            let kw = q.get("kw")
            if (kw !== null)
                if (query === "")
                    query += `?kw=${kw}`
                else
                    query += `&kw=${kw}`

            let page = q.get("page")
            if (page !== null)
                if (query === "")
                    query += `?page=${page}`
                else
                    query += `&page=${page}`
          
            const res = await Apis.get(`${endpoints['sanhs']}${query}`)
            setSanhs(res.data.results)

            setNext(res.data.next !== null)
            setPrev(res.data.previous !== null)
        }

        loadSanhs()
    }, [q, page])

    const search = (event) => {
        event.preventDefault()

        nav(`/sanh-tiec/?kw=${kw}`)
    }

    const paging = (inc) => {
        setPage(page + inc)

        nav(`/sanh-tiec/?page=${page + inc}`)
    }

    return (
        <>
        <Container style={{marginTop: "10px"}}>
            <Row>
                <Col lg={8} xs={12}>
                    <h2 className="text-center text-danger">SẢNH TIỆC TIỆC CƯỚI</h2>
                    <ColoredLine color="red" />
                    {sanhs.length === 0 && <Spinner animation="border" />}
                    <ButtonGroup style={{marginBottom: "15px", marginLeft: "25px"}}>
                        <Button variant="info" onClick={() => paging(-1)} disabled={!prev}>&lt;&lt;</Button>
                        <Button variant="info" onClick={() => paging(1)} disabled={!next}>&gt;&gt;</Button>
                    </ButtonGroup>
                    {sanhs.map(c => {return <SanhItems id={c.id} image={c.image} ten={c.ten} sl_ban_max={c.sl_ban_max} ghi_chu={c.ghi_chu}/>})}
                </Col>
                <Col lg={4} xs={12}>
                    <div>
                        <h2 className="text-center text-danger">LOẠI SẢNH</h2>
                        <ColoredLine color="red" />
                        {loaiSanhs.map(c => {
                            const url = `/sanh-tiec/?loai_id=${c.id}`
                            return  to={url} className="nav-link" style={{color: "#212529"}}>{c.ten}</Link>
                        })}
                        
                    </div>
                    <div>
                        <Form className="d-flex" onSubmit={search}>
                            <FormControl type="search" value={kw} onChange={event => setKw(event.target.value)} placeholder="Tìm tên sảnh" className="me-2" aria-label="Search" />
                            <Button type="submit" variant="outline-success">Tìm</Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default Sanh