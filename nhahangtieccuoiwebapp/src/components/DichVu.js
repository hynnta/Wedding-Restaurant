import { useEffect, useState } from "react"
import { Button, ButtonGroup, Container, Spinner } from "react-bootstrap"
import { useNavigate, useSearchParams } from "react-router-dom"
import Apis, { endpoints } from "../configs/Apis"
import ColoredLine from "../layouts/ColoredLine"
import DichVuItems from "../layouts/Items/DichVuItems"

function DichVu() {
  const[dichvus, setDichVus] = useState([])
  const [q] = useSearchParams()
  const nav = useNavigate()
  const [prev, setPrev] = useState(false)
  const [next, setNext] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    let loadDichVus = async () => {
      let query = ""
      let page = q.get("page")
      if (page !== null)
        if (query === "")
          query += `?page=${page}`
        else
          query += `&page=${page}`

      const res = await Apis.get(`${endpoints['dichvus']}${query}`)
      setDichVus(res.data.results)

      setNext(res.data.next !== null)
      setPrev(res.data.previous !== null)
    }
    
    loadDichVus()
  }, [q, page])

  const paging = (inc) => {
    setPage(page + inc)

    nav(`/dich-vu/?page=${page + inc}`)
  }
  
  return (
    <>
    <Container style={{marginTop: "10px"}}>
      <h2 className="text-center text-danger">DỊCH VỤ TIỆC CƯỚI</h2>
      <ColoredLine color="red" />
      {dichvus.length === 0 && <Spinner animation="border" />}
      <ButtonGroup style={{marginBottom: "15px", marginLeft: "25px"}}>
        <Button variant="info" onClick={() => paging(-1)} disabled={!prev}>&lt;&lt;</Button>
        <Button variant="info" onClick={() => paging(1)} disabled={!next}>&gt;&gt;</Button>
      </ButtonGroup>
      {dichvus.map(c => <DichVuItems image={c.image} ten={c.ten} gia={c.gia}/>)}
    </Container>
    </>
  )
}

export default DichVu