import { useContext } from "react"
import { Container, Image, Nav, Navbar, NavDropdown } from "react-bootstrap"
import cookie from "react-cookies"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../App"

function Header() {
    const [user, dispatch] = useContext(UserContext)
    const nav = useNavigate()

    const logout = (evt) => {
        evt.preventDefault()

        cookie.remove('token')
        cookie.remove('sanhid')
        cookie.remove('menuid')
        cookie.remove('dichvuid')
        
        dispatch({
            "type": "logout"
        })

        nav('/')
    }

    let btn = <>
        <Link to="/login" className="nav-link text-danger">Đăng nhập</Link>
        <Link to="/register" className="nav-link text-danger">Đăng ký</Link>
    </>
    if (user != null)
        btn = <>
            <NavDropdown title={user.username} id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to={`/user/${user.id}/tieccuois`}>Lịch sử đặt tiệc</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Đăng xuất</NavDropdown.Item>
            </NavDropdown>
        </>
    
    return (
        <>
        <Navbar collapseOnSelect bg="dark" expand="lg" variant="dark" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">Nhà hàng tiệc cưới</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link className="nav-link" to="/sanh-tiec">Sảnh tiệc</Link>
                    <Link className="nav-link" to="/menu">Thực đơn</Link>
                    <Link className="nav-link" to="/dich-vu">Dịch vụ</Link>
                    {btn}
                    <Link className="nav-link text-danger" to="/dat-tiec">Đặt tiệc</Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    )
}

export default Header