import { useContext, useEffect, useState } from "react"
import { Button, Container, Spinner, Tab, Tabs } from "react-bootstrap"
import Apis, { endpoints } from "../configs/Apis"
import DatTiecSanhItems from "../layouts/Items/DatTiecSanhItems"
import DatTiecMenuItems from "../layouts/Items/DatTiecMenuItems"
import DatTiecDichVuItems from "../layouts/Items/DatTiecDichVuItems"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../App"
import ColoredLine from "../layouts/ColoredLine"

function DatTiec() {
    const [sanhs, setSanhs] = useState([])
    const [menus, setMenus] = useState([])
    const [dichvus, setDichVus] = useState([])
    const [activeTab, setActiveTab] = useState('sanh')
    const nav = useNavigate()
    const [user, dispatch] = useContext(UserContext)

    useEffect(() => {
        let loadSanhs = async () => {
            const res = await Apis.get(endpoints['sanhs'])
            setSanhs(res.data.results)
        }

        loadSanhs()
    }, [])

    useEffect(() => {
        let loadMenus = async () => {
            let res = await Apis.get(endpoints['menus'])
            setMenus(res.data.results)
        }

        loadMenus()
    }, [])

    useEffect(() => {
        let loadDichVus = async () => {
            let res = await Apis.get(endpoints['dichvus'])
            setDichVus(res.data.results)
        }

        loadDichVus()
    }, [])

    function toNextTab(e) {
        e.preventDefault()
        handleTabChange()
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    function handleTabChange() {
        if (activeTab === 'sanh') {
            setActiveTab('menu')
        }
        if (activeTab === 'menu') {
            setActiveTab('dichvu');
        }
    }

    const thongTinDatTiec = () => {
        nav('/dat-tiec/thong-tin')
    }

    let tab = <> <em><Link to="/login">ĐĂNG NHẬP</Link> ĐỂ CÓ THỂ ĐẶT TIỆC</em> </>

    if (user !== null && user !== undefined) {
        tab = <>
                <h2 className="text-center text-danger">ĐẶT TIỆC CƯỚI</h2>
                <ColoredLine color="red" />
                <Tabs activeKey={activeTab} id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="sanh" title="Sảnh">
                        {sanhs.length === 0 && <Spinner animation="border" />}
                        {sanhs.map(c => {return <DatTiecSanhItems id={c.id} image={c.image} ten={c.ten} 
                                                                sl_ban_max={c.sl_ban_max} ghi_chu={c.ghi_chu} />})}
                        
                        <Button onClick={e => {toNextTab(e)}} style={{ display: 'block' }}>Tiếp tục</Button>
                        <hr />
                    </Tab>

                    <Tab eventKey="menu" title="Menu">
                        {menus.map(c => <DatTiecMenuItems id={c.id} image={c.image} 
                                                        ten={c.ten} khai_vi={c.khai_vi} 
                                                        mon_sup={c.mon_sup} 
                                                        mon_chinh1={c.mon_chinh1} 
                                                        mon_chinh2={c.mon_chinh2} 
                                                        mon_chinh3={c.mon_chinh3} 
                                                        trang_mieng={c.trang_mieng} />)}

                        <Button onClick={e => toNextTab(e)} style={{ display: 'block' }}>Tiếp tục</Button>
                        <hr />
                    </Tab>

                    <Tab eventKey="dichvu" title="Dịch vụ">
                        {dichvus.map(c => <DatTiecDichVuItems id={c.id} image={c.image} ten={c.ten} gia={c.gia} />)}
                        <Button onClick={thongTinDatTiec}>Tiếp tục</Button>
                        <hr />
                    </Tab> 
                    
                </Tabs>
            </>
    }

    return (
        <>
        <Container style={{marginTop: "10px"}}>
            {tab}
        </Container>
        </>
    )
}

export default DatTiec