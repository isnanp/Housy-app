import Filter from "../../components/SidebarFilter";
import { Col, Container, Row } from "react-bootstrap";
import CardProperties from "../../components/CardProperties";


export default function HomeTenant(props) {
    const Properties = props?.data 
    return (
        <>
            <Row className="mb-5">
                <Col sm="3" className="ms-3 ps-3 pb-5" >
                    <Filter Price={props.Price} Bedroom={props.Bedroom} Bathroom={props.Bathroom} setSearch={props.setSearch} refetch={props.refetch} type={props.type} setBtnType={props.setBtnType} setBedroom={props.setBedroom} setBathroom={props.setBathroom} setPrice={props.setPrice} />
                </Col>
                <Col>
                {Properties?.length === 0 ? (
                    <Container className="text-center mt-5">
                        <h1>Tidak ada tiket yang tersedia</h1>
                    </Container>
                ) : (
                    <Row className="g-3">
                    {Properties?.map((data, i) => (
                        <>
                            <CardProperties key={i} data={data} />
                        </>
                    ))}     
                    </Row>
                )}


                </Col>
            </Row>    
            
        </>
    )
}