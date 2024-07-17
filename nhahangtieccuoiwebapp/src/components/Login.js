import { useContext, useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import cookie from "react-cookies"
import { Navigate } from "react-router-dom"
import { UserContext } from "../App"
import Apis, { authApi, endpoints } from "../configs/Apis"
import ColoredLine from "../layouts/ColoredLine"

const Login = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [user, dispatch] = useContext(UserContext)

    const login = async (evt) => {
        evt.preventDefault()

        const res = await Apis.post(endpoints['login'], {
            'username': username,
            'password': password,
            'client_id': '8Na8jID0tOktGsj5264s86LJumvxlkFgGmcM0Qi3',
            'client_secret': 'vkWtITR6FuEICkwBPtVWSJR8OmnlPV2aCLEtKb2STjQFcU9VBsZWO2ijLpcZldww2yTTMUxKDCMVMuLchPXosKKUl0df3DhYwuJxkX48GDz2R0Lack4YCIo4xasf03EA',
            'grant_type': 'password'
        })

        console.info(res.data)
        cookie.save('token', res.data.access_token)

        const user = await authApi().get(endpoints['current-user'])
        console.info(user.data)
        
        dispatch({
            'type': 'login',
            'payload': user.data
        })
    }

    if (user != null)
        return <Navigate to="/" />

    return (
        <>
        <Container style={{marginTop: "10px"}}>
            <h2 className="text-center text-danger">ĐĂNG NHẬP</h2>
            <ColoredLine color="red" />
            <Form onSubmit={login}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Control type="text" 
                        value={username} 
                        onChange={(evt) => setUsername(evt.target.value)}
                        placeholder="Username*" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" 
                            value={password} 
                            onChange={(evt) => setPassword(evt.target.value)}
                            placeholder="Password*" />
                </Form.Group>

                <Button variant="primary" type="submit" style={{marginBottom: "15px"}}>
                    Đăng nhập
                </Button>
            </Form>
        </Container>
        </>
    )
}

export default Login