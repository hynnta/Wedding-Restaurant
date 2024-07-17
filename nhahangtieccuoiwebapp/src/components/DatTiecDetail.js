import { DateTimePicker } from "@mui/lab"
import { TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import cookie from "react-cookies"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../App"
import Apis, { endpoints } from "../configs/Apis"
import ColoredLine from "../layouts/ColoredLine"


function DatTiecDetail () {
    const [slban, setSlban] = useState()
    const [tenchure, setTenchure] = useState()
    const [tencodau, setTencodau] = useState()
    const [tongtien, setTongtien] = useState(0)
    const [user] = useContext(UserContext)
    const [selectedDateTime, setSelectedDateTime] = useState(new Date())
    const [sanh, setSanh] = useState()
    const [dichvu, setDichvu] = useState()
    const nav = useNavigate()

    const numberFormat = (value) => new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(value);

    useEffect(() => {
        let loadSanh = async () => {
            let res = await Apis.get(endpoints['sanhs-detail'](cookie.load('sanhid')))
            setSanh(res.data)
        }

        loadSanh()
    }, [])

    useEffect(() => {
        let loadDichvu = async () => {
            let res = await Apis.get(endpoints['dichvus-detail'](cookie.load('dichvuid')))
            setDichvu(res.data)
        }

        loadDichvu()
    }, [])

    const dattiec = async (evt) => {
        evt.preventDefault()

        const res = await Apis.post(endpoints['tieccuoi'], {
            'menu': cookie.load('menuid'),
            'sanh': cookie.load('sanhid'),
            'user': user.id,
            'dichvus': [cookie.load('dichvuid')], //chưa làm đc
            'ngay_to_chuc': selectedDateTime,
            'sl_ban': slban,
            'ten_chu_re': tenchure,
            'ten_co_dau': tencodau
        })

        const res2 = await Apis.post(endpoints['chitiethoadon'], {
            'tieccuoi': res.data.id,
            'thanh_tien': tongtien
        })

        const res3 = await Apis.post(endpoints['hoadon'], {
            'user' : user.id,
            "chi_tiet_hoa_don": res2.data.id
        })

        if (res != null && res2 !=null && res3 != null) {
            alert("ĐẶT TIỆC THÀNH CÔNG")
            nav(`/`)
        } else 
            alert("ĐẶT TIỆC KHÔNG THÀNH CÔNG")
    }

    const thanhtoan = (evt) => {
        if (selectedDateTime.getHours <= 12) {
            var tt = evt.target.value * sanh.loai.gia_sang 
            setTongtien(tt)
        }
        else if (12 <= selectedDateTime.getHours <= 16) {
            var tt = evt.target.value * sanh.loai.gia_trua
            setTongtien(tt)
        }
        else if (16 <= selectedDateTime.getHours <= 18) {
            var tt = evt.target.value * sanh.loai.gia_toi
            setTongtien(tt)
        }
        else if (selectedDateTime.getDay === 5 || selectedDateTime.getDay === 6) {
            var tt = evt.target.value * sanh.loai.gia_cuoi_tuan
            setTongtien(tt)
        }
        else
            alert('Hãy chọn ngày tổ chức tiệc')

        setSlban(evt.target.value)
    }

    return (
        <>
        <Container style={{marginTop: "10px"}}>
            <h2 className="text-center text-danger">THÔNG TIN ĐẶT TIỆC</h2>
            <ColoredLine color="red" />
            <Form onSubmit={dattiec}>
                <Form.Group className="mb-3" controlId="formBasicTenchure">
                    <Form.Label>Tên chú rể</Form.Label>
                    <Form.Control style={{marginBottom: "10px"}} type="text" value={tenchure} 
                            onChange={(evt) => setTenchure(evt.target.value)} placeholder="Nhập tên chú rể" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicTencodau">
                    <Form.Label>Tên cô dâu</Form.Label>
                    <Form.Control style={{marginBottom: "10px"}} type="text" value={tencodau} 
                            onChange={(evt) => setTencodau(evt.target.value)} placeholder="Nhập tên cô dâu" />
                </Form.Group>

                <div style={{marginBottom: "10px"}}>
                    <DateTimePicker label='Chọn ngày tổ chức tiệc'
                                    value={selectedDateTime}
                                    onChange={newValue => { setSelectedDateTime(newValue) }} 
                                    renderInput={params => <TextField {...params} />}
                                    minTime={new Date(0, 0, 0, 7)} maxTime={new Date(0, 0, 0, 19)}
                                    minutesStep={15}
                                    shouldDisableTime={(timeValue, clockType) => {
                                        if (clockType === 'hours' && timeValue % 2) {
                                            return true
                                        }
                                        return false;
                                    }}/>
                </div>

                <Form.Group className="mb-3" controlId="formBasicSlban">
                    <Form.Label>Số lượng bàn</Form.Label>
                    <Form.Control style={{marginBottom: "10px"}} type="number" value={slban} min="1"
                            onChange={evt => {thanhtoan(evt)}} placeholder="Nhập số lượng bàn"/>
                </Form.Group>

                <h3>Tổng tiền: {numberFormat(tongtien)}</h3>

                <Button type="submit" style={{marginBottom: "20px"}}>ĐẶT TIỆC</Button>
            </Form>   
        </Container>
        </>
    )
}

export default DatTiecDetail