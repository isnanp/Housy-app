import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function CardProperties({data}) {
    const navigate = useNavigate()
    return (
        <Col sm="4" >     
            <Card onClick={() => navigate(`/property-detail/${data.id}`)} className="p-3" style={{cursor:"pointer"}}>
                <div style={{fontSize:"13px"}}  className="position-absolute mt-3 ms-3 d-flex gap-2">
                {data?.amenity?.map((amenity, i) => (
                    <span key={i} className="p-1 bg-white rounded-2">
                    {amenity}
                    </span>
                ))}
                </div>

                <Card.Img style={{objectFit:"cover", width:"320px", height:"200px"}} src={data.images} />
                <Card.Body className="">
                <Card.Title className="fs16 fw-bold">
                    Rp. {data?.price} / {data?.type}
                </Card.Title>
                <Card.Text className="fw-semibold">
                    {data?.bedrooms} Bedrooms, {data?.bathrooms} Bathrooms
                </Card.Text>
                <Card.Text className="text-secondary fw-semibold">
                    {data?.city}
                </Card.Text>
                </Card.Body>
            </Card>
        </Col>  
    )
}