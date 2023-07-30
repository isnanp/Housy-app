import { Col, Container, Row } from "react-bootstrap";
import Icon from "../assets/icon.png";
import QrCode from "../assets/barcode.png";


export default function Booking(props) {
    let data = props.data;
    return (

    <div>  
            <Container className="shadow pb-3" style={{border: "1px solid #B7B7B7", borderRadius:"5px", padding:"0", width:"75%"}}>
                    <Row>
                        <Col>
                            <div className="grad " style={{width:"10rem", padding:"8px", height:"3.5rem", borderRadius:"5px 0 50px 0"}}>
                                <div className="d-flex align-items-center"  style={{marginTop:"auto", marginBottom:"auto"}}>
                                    <img style={{paddingLeft:"3px", marginBottom:"18px"}} src={Icon} alt="logo" />
                                </div>
                            </div>
                        </Col>
                        <Col className="pe-3" style={{textAlign:"end"}}>
                        <h1 style={{marginBottom:"0", paddingBottom:"0"}}>{props.page}</h1>
                        <p className="text-muted">Saturday, 24 april 2023</p>
                        </Col>
                    </Row>
                    <Row style={{width:"90%", padding:"1rem"}}>
                        <Col className="me-5">
                        <h3><b>{data?.property.name}</b></h3>
                        <p>{data?.property.address}</p>
                        {data?.status === "pending" ? (
                            <div className="text-center" style={{textAlign:"center", background: "#fce3ec", width:"max-content", borderRadius:"3px"}}>
                                <p style={{margin:"10px", color:"orange"}}>Pending</p>
                            </div>
                        ) : (
                            <div className="text-center" style={{textAlign:"center", background: "#95fc95", width:"max-content", borderRadius:"3px"}}>
                            <p style={{margin:"10px", color:"green"}}>Approved</p>
                            </div>
                        )}
                        

                        </Col>
                        <Col sm="1" className="pt-2">
                            <div style={{borderColor:"#5A57AB",borderRadius:"50%", borderStyle:"solid", borderWidth:"2px", width:"1rem", height:"1rem"}}></div>
                            <div style={{borderColor:"#5A57AB", borderStyle:"solid", borderWidth:"0 2px 0 0", height:"3.5rem", width:"2px", margin:"3px 0 3px 7px"}}></div>
                            <div style={{borderColor:"#5A57AB",borderRadius:"50%", borderStyle:"solid", borderWidth:"2px", width:"1rem", height:"1rem", background:"#5A57AB"}}></div>
                        </Col>
                        <Col>
                            <h4>Check in</h4>
                            <p className="text-muted">{data?.checkIn}</p>
                            <h4>Check out</h4>
                            <p className="text-muted">{data?.checkOut}</p>
                        </Col>
                        <Col>
                            <h4>Amenities</h4>
                            <p className="text-muted">
                                {data?.property?.amenity?.map(d => (
                                    `${d}, `
                                    ))}
                            </p>
                            <h4>Type of rent</h4>
                            <p className="text-muted">{data?.property.type}</p>
                        </Col>
                            {data?.status !== "pending" ? (
                                <img style={{objectFit:"cover", width:"9rem"}} src={QrCode} alt="barcode" />
                            ) : (
                                <span></span>
                            )}
                        

                    </Row>
                    <Row>
                        <Col>
                            <Row style={{marginLeft:"1rem"}}>
                                <Col>No. Tanda pengenal</Col>
                                <Col>Nama Pemesan</Col>
                                <Col>No. Handphone</Col>
                                <Col>Email</Col>
                                <Col>Long Time Rent : {data?.duration} {data?.property.type}</Col>
                            </Row>
                            <hr style={{margin:"3px 0"}} />
                            <Row className="text-muted" style={{marginLeft:"1rem"}}>
                                <Col>24907104021740</Col>
                                <Col>{data?.tenant.fullname}</Col>
                                <Col>{data?.tenant.phone}</Col>
                                <Col>{data?.tenant.email}</Col>
                                {data?.status === "pending" ? (
                                    <Col className="text-danger text-end me-4">{data?.price}</Col>
                                ) : (
                                    <Col className="text-success text-end me-4">{data?.price}</Col>
                                )}
                            </Row>
                        </Col>
                    </Row> 
            </Container>           
        </div>
    )
}
