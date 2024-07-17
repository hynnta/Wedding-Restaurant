import { useEffect, useState } from "react"
import { Container, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import Apis, { endpoints } from "../configs/Apis"
import ColoredLine from "../layouts/ColoredLine"
import TiecItems from "../layouts/Items/TiecItems"

function TiecCuoi() {
    const [tiecs, setTiecs] = useState([])
    const { userId } = useParams()

    useEffect(() => {
        const loadTiecs = async () => {
            const res = await Apis.get(endpoints['tieccuoi-user'](userId))
            setTiecs(res.data)
        }

        loadTiecs()
    }, [])

    return (
        <>
        <Container style={{marginTop: "10px"}}>
            <h2 className="text-center text-danger">LỊCH SỬ TIỆC ĐÃ ĐẶT</h2>
            <ColoredLine color="red" />
            <Row>
                {tiecs.map(c => {return <TiecItems id={c.id} 
                                                    sl_ban={c.sl_ban} 
                                                    ngay_to_chuc={c.ngay_to_chuc} 
                                                    ten_chu_re={c.ten_chu_re} 
                                                    ten_co_dau={c.ten_co_dau}/>})}
            </Row>
        </Container>
        </>
    )
}

export default TiecCuoi