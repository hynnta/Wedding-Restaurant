import { useRef, useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Apis, { endpoints } from "../configs/Apis"
import ColoredLine from "../layouts/ColoredLine"

function Register() {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const avatar = useRef()
    const nav = useNavigate()

    const register = (evt) => {
        evt.preventDefault()

        let registerUser = async () => {
            const formData = new FormData()
            formData.append("first_name", firstName)
            formData.append("last_name", lastName)
            formData.append("username", username)
            formData.append("password", password)
            formData.append("email", email)
            formData.append("avatar", avatar.current.files[0])
            
            let res = await Apis.post(endpoints['register'], formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.info(res.data)
            if (res.data != null)
                nav('/login')
        }
        if (password !== null && password === confirmPassword) {
            registerUser()
        }
    }

    return (
        <>
        <Container style={{marginTop: "10px"}}>
            <h2 className="text-center text-danger">ĐĂNG KÝ NGƯỜI DÙNG</h2>
            <ColoredLine color="red" />
            <Form onSubmit={register}>
                <RegisterForm id="firstName" type="text" value={firstName}
                                change={(evt) => setFirstName(evt.target.value)}
                                placeholder={"First Name"}/>

                <RegisterForm id="lastName" type="text" value={lastName}
                                change={(evt) => setLastName(evt.target.value)}
                                placeholder={"Last Name"}/>

                <RegisterForm id="email" type="email" value={email}
                                change={(evt) => setEmail(evt.target.value)}
                                placeholder={"Email*"}/>

                <RegisterForm id="username" type="text" value={username}
                                change={(evt) => setUsername(evt.target.value)}
                                placeholder={"Username*"}/>

                <RegisterForm id="password" type="password" value={password}
                                change={(evt) => setPassword(evt.target.value)}
                                placeholder={"Password*"}/>

                <RegisterForm id="confirmPassword" type="password" value={confirmPassword}
                                change={(evt) => setConfirmPassword(evt.target.value)}
                                placeholder={"Confirm Password*"}/>

                <Form.Group className="mb-3" controlId="avatar">
                    <Form.Label>Avatar</Form.Label>
                    <Form.Control type="file" ref={avatar} className="form-control"/>
                </Form.Group>

                <Button variant="primary" type="submit" style={{marginBottom: "15px"}}>
                    Đăng ký
                </Button>
            </Form>
        </Container>
        </>
        
    )
}

export default Register

function RegisterForm(props) {
    return (
    <Form.Group className="mb-3" controlId={props.id}>
        <Form.Control type={props.type} 
                    value={props.value} 
                    onChange={props.change}
                    placeholder={props.placeholder}/>
    </Form.Group>
    )
}