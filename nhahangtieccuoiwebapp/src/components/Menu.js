import { useEffect, useState } from "react"
import { Button, ButtonGroup, Container, Spinner } from "react-bootstrap"
import { useNavigate, useSearchParams } from "react-router-dom"
import Apis, { endpoints } from "../configs/Apis"
import ColoredLine from "../layouts/ColoredLine"
import MenuItems from "../layouts/Items/MenuItems"

function Menu() {
  const [menus, setMenus] = useState([])
  const [prev, setPrev] = useState(false)
  const [next, setNext] = useState(false)
  const [page, setPage] = useState(1)
  const [q] = useSearchParams()
  const nav = useNavigate()

  useEffect(() => {
    let loadMenus = async () => {
      let query = ""
      let page = q.get("page")
      if (page !== null)
        if (query === "")
          query += `?page=${page}`
        else
          query += `&page=${page}`

      let res = await Apis.get(`${endpoints['menus']}${query}`)
      setMenus(res.data.results)

      setNext(res.data.next !== null)
      setPrev(res.data.previous !== null)
    }
    
    loadMenus()
  }, [q, page])

  const paging = (inc) => {
    setPage(page + inc)

    nav(`/menu/?page=${page + inc}`)
  }

  return (
      <>
      <Container style={{marginTop: "10px"}}>
          <h2 className="text-center text-danger">SET THỰC ĐƠN ĐƯỢC YÊU THÍCH NHẤT</h2>
          <ColoredLine color="red" />
          {menus.length === 0 && <Spinner animation="border" />}
          <ButtonGroup style={{marginBottom: "15px", marginLeft: "25px"}}>
            <Button variant="info" onClick={() => paging(-1)} disabled={!prev}>&lt;&lt;</Button>
            <Button variant="info" onClick={() => paging(1)} disabled={!next}>&gt;&gt;</Button>
          </ButtonGroup>
          {menus.map(c => <MenuItems image={c.image} ten={c.ten} khai_vi={c.khai_vi} mon_sup={c.mon_sup} mon_chinh1={c.mon_chinh1} mon_chinh2={c.mon_chinh2} mon_chinh3={c.mon_chinh3} trang_mieng={c.trang_mieng}/>)}
      </Container>
      </>
  )
}

export default Menu