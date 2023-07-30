import { Button, Col, Container, Row } from "react-bootstrap";
import TimeDuration from "../../components/modal/TimeDuration";
import { useContext, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import { API } from "../../config/api";
import Login from "../../components/modal/Login";
import { UserContext } from "../../context/usercontext";

export default function PropertyDetail() {
    const [state] = useContext(UserContext)

    const p = useParams()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)
    
    const [showLogin, setShowLogin] = useState(false);
    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => {setShowLogin(true)}

    let { data: Properties } = useQuery("PropertiesDetailCache", async () => {
    const response = await API.get(`/property/${p.id}`);
    console.log(response.data.data);
    return response.data.data;
    });


    return (
        <>
        <Container className="w-75">
            <div className="d-flex justify-content-center">
            <img className="mx-auto" style={{width:"96%", height:"30rem",objectFit:"cover"}} src={Properties?.images} alt="" />
            </div>
            <Row className="">
                <Col className="d-flex justify-content-center">
                    <img className="my-3" style={{objectFit:"cover", width:"300px", height:"200px"}} src={Properties?.images} alt="" />
                </Col>
                <Col className="d-flex justify-content-center">
                    <img className="my-3" style={{objectFit:"cover", width:"300px", height:"200px"}} src={Properties?.images} alt="" />
                </Col>
                <Col className="d-flex justify-content-center">
                    <img className="my-3" style={{objectFit:"cover", width:"300px", height:"200px"}} src={Properties?.images} alt="" />
                </Col>
            </Row>

            <h1>{Properties?.name}</h1>
            <Row>
                <Col>
                    <h3>{Properties?.price} / {Properties?.type} </h3>
                    <p>{Properties?.address}</p>                
                </Col>
                <Col>
                    <Row>
                        <Col>
                            Bedrooms
                        </Col>
                        <Col>
                            Bathrooms
                        </Col>
                        <Col>
                            Area
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {Properties?.bedrooms}
                        </Col>
                        <Col>
                            {Properties?.bathrooms}
                        </Col>
                        <Col>
                            13142 ft
                        </Col>
                    </Row>
                </Col>
            </Row>
            <h4>
                Description
            </h4>
            <p>
                {Properties?.description}
            </p>
            <div className="d-flex justify-content-end" style={{marginBottom:"8rem"}}>
                <Button onClick={() => {state.isLogin ? handleShow() : handleShowLogin()}}>
                    Book Now
                </Button>
            </div >
        </Container>
        <TimeDuration show={show} onHide={handleClose} id={Properties?.id} price={Properties?.price} type={Properties?.type} />
         <Login show={showLogin} onHide={handleCloseLogin}/>
        </>
    )
}