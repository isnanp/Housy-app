import {
    Button,
    ButtonGroup,
    Container,
    Dropdown,
    DropdownButton,
    Form,
    InputGroup,
    Navbar
} from "react-bootstrap";
import icon from "../assets/icon.png"
import Signup from "./modal/Signup";
import {useContext, useState} from "react";
import Login from "./modal/Login";
import {UserContext} from "../context/usercontext";
import { Link, useNavigate } from "react-router-dom";
import IconUserDD from "../assets/IconUserDD.png"
import IconBookingDD from "../assets/IconBookingDD.png"
import IconHistoryDD from "../assets/IconHistoryDD.png"
import IconLogoutDD from "../assets/IconLogoutDD.png"
import IconPropertyDD from "../assets/IconPropertyDD.png"


export default function NavbarCustom(props) {
    const navigate = useNavigate()
    const [state, dispatch] = useContext(UserContext)
    const logout = () => {
        dispatch({type: "LOGOUT"});
    }

    const [showRegister, setShowRegister] = useState(false);
    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => {
        setShowRegister(true);
        setShowLogin(false);
    }

    const [showLogin, setShowLogin] = useState(false);
    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => {
        setShowLogin(true)
        setShowRegister(false);
    }

    const handleChange = () => {
        state.isLogin ? (
            props.setSearch(document.getElementById("searchLogin").value)
        ) : (
            props.setSearch(document.getElementById("search").value)
        )
    }


    return (
        <Navbar className="bg-body-white">
            <Container fluid="fluid" className="px-5">
                <Navbar.Brand><img style={{objectFit:"cover", cursor:"pointer"}} className="pe-auto" onClick={state.user.role === "owner" ? (() => navigate("/transactions")) : (() => navigate("/")) }  src={icon} alt="icon"/>
                </Navbar.Brand>
                <Navbar.Toggle/> {
                    state.user.role == "owner"
                        ? (
                            <DropdownButton
                                as={ButtonGroup}
                                key="dropdown"
                                drop="start"
                                variant="transparent"
                                title={<img className = "p-0 rounded-circle"
                                style = {{ width: "50px", height: "50px" }}
                                src = {
                                    state.user.image
                                }
                                alt = "pp" />}>
                                <Link to="/profile/owner" style={{textDecoration:"none"}}>
                                    <Dropdown.Item href="#/action-2"> <img src={IconUserDD} alt="bill" style={{height:"1rem", paddingRight:"3px"}} /> Profile</Dropdown.Item>
                                </Link>
                                <Link to="addProperty" style={{textDecoration:"none"}}>
                                    <Dropdown.Item href="#/action-2"> <img src={IconPropertyDD} alt="bill" style={{height:"1rem", paddingRight:"3px"}} /> Add Property</Dropdown.Item>
                                </Link>
                                <Link to="/history-list-owner" style={{textDecoration:"none"}}>
                                    <Dropdown.Item href="#/action-2"> <img src={IconHistoryDD} alt="bill" style={{height:"1rem", paddingRight:"3px"}} /> History</Dropdown.Item>
                                </Link>
                                <Dropdown.Divider/>
                                <Dropdown.Item onClick={() => {logout(); navigate("/")}}><img src={IconLogoutDD} alt="bill" style={{height:"1rem", paddingRight:"3px"}} /> Logout</Dropdown.Item>
                            </DropdownButton>
                        )
                        : state.isLogin
                            ? (
                                <> < Form > <InputGroup className="mb-3">
                                    <Form.Control
                                        onChange={handleChange}
                                        id="searchLogin"
                                        value={props.search}
                                        placeholder="City"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"/>                                       
                                    <Button onClick={() => props.refetch()} variant="outline-secondary" id="button-addon2">
                                        Search
                                    </Button>
                                </InputGroup>
                            </Form>

                            <DropdownButton
                                as={ButtonGroup}
                                key="dropdown"
                                drop="start"
                                variant="transparent"
                                title={<img className = "p-0 rounded-circle"
                                style = {{ width: "50px", height: "50px" }}
                                src = {
                                    state.user.image
                                }
                                alt = "pp" />}>
                                <Link to="/profile/tenant" style={{textDecoration:"none"}}>
                                    <Dropdown.Item href="#/action-2"> <img src={IconUserDD} alt="bill" style={{height:"1rem", paddingRight:"3px"}} /> Profile</Dropdown.Item>
                                </Link>
                                <Link to="/bookinglist" style={{textDecoration:"none"}}>
                                    <Dropdown.Item href="#/action-2"> <img src={IconBookingDD} alt="bill" style={{height:"1rem", paddingRight:"3px"}} /> MyBooking</Dropdown.Item>
                                </Link>
                                <Link to="/bookinglist" style={{textDecoration:"none"}}>
                                    <Dropdown.Item href="#/action-2"> <img src={IconHistoryDD} alt="bill" style={{height:"1rem", paddingRight:"3px"}} /> History</Dropdown.Item>
                                </Link>
                                <Dropdown.Divider/>
                                <Dropdown.Item onClick={() => {logout(); navigate("/")}}><img src={IconLogoutDD} alt="bill" style={{height:"1rem", paddingRight:"3px"}} /> Logout</Dropdown.Item>
                            </DropdownButton>
                        </>
                            )
                            : (
                                <> < Form onSubmit={(e) => {e.preventDefault(); props.refetch()}}> 
                                <InputGroup className="mb-3">
                                    <Form.Control
                                    onChange={handleChange}
                                        id="search"
                                        value={props.search}
                                        placeholder="City"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"/>
                                    <Button type="submit"  variant="outline-secondary" id="button-addon2">
                                        Search
                                    </Button>
                                </InputGroup>
                            </Form>
                            <div>
                                <Button
                                    variant="outline-secondary"
                                    className="me-2"
                                    onClick={handleShowRegister}>
                                    Sign Up
                                </Button>
                                <Button variant="secondary" onClick={handleShowLogin}>
                                    Login
                                </Button>
                            </div>
                            <Signup show={showRegister} onHide={handleCloseRegister} onclick={handleShowLogin}/>
                            <Login show={showLogin} onHide={handleCloseLogin} onClick={handleShowRegister}/>
                        </>
                            )
                }
            </Container>
        </Navbar>
    )
}