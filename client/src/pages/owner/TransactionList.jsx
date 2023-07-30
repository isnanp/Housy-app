import { Button, Col, Container, Row } from "react-bootstrap";
import IconSearch from "../../assets/search.png"
import { useQuery } from "react-query";
import { API } from "../../config/api";
import { useEffect, useState } from "react";
import ModalDetail from "../../components/modal/TransactionDetail";

export default function TransactionList() {
     let { data: Transactions, refetch } = useQuery("transactionOwnerlistCache", async () => {
    const response = await API.get("/transactions-owner");
    console.log("ini list transaksi",response.data.data);
    return response.data.data;
    });

    const [showDetail, setShowDetail] = useState(false);
    const handleCloseDetail = () => setShowDetail(false);
    const handleShowDetail = () => setShowDetail(true);

    const [ID, setID] = useState()

    useEffect(() => {
        refetch()
    },[])

    return (
        <>
        <Container className="m-5">
            <h1 className="mt-3 mb-5"><b>List Transaksi</b></h1>
            <Row className="mb-3">
                <Col sm="1">No.</Col>
                <Col>Users</Col>
                <Col>Type Of Rent</Col>
                <Col>Bukti Transfer</Col>
                <Col>Status Payment</Col>
                <Col>Action</Col>
            </Row>

          {Transactions?.map((data, i) => (
            <Row key={i} className="py-3" style={{borderWidth:"2px 0 2px 0", borderStyle:"solid", borderColor:"#C4C4C4"}}>
                <Col sm="1"> {i + 1} </Col>
                <Col>{data?.tenant.fullname}</Col>
                <Col>{data?.property.type}</Col>
                <Col> buktiTf.png </Col>
                <Col>{data?.status === "pending" ? (
                    <p className="text-warning">{data?.status}</p>
                ) : (
                    <p className="text-success">{data?.status}</p>
                )}</Col>
                <Col>
                    <Button onClick={() => {setID(data?.id); handleShowDetail()}} variant="transparent"> <img src={IconSearch} alt="src" />  </Button> 
                </Col>
            </Row>
          ))}
        <ModalDetail show={showDetail} onHide={handleCloseDetail} id={ID} />
        </Container>
        
        </>
    )
}