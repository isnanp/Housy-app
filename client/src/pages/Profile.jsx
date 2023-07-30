import { Button, Col, Container, Form, Row } from "react-bootstrap";
import IconProfile from "../assets/IconProfil.png"
import IconPassword from "../assets/IconPassword.png"
import IconEmail from "../assets/IconEmail.png"
import IconStatus from "../assets/IconStatus.png"
import IconGender from "../assets/IconGender.png"
import IconPhone from "../assets/IconPhone.png"
import IconAddress from "../assets/IconAddress.png"
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import ChangePw from "../components/modal/ChangePassword";
import { useState } from "react";

export default function ProfilePage() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true)};

    let { data: User } = useQuery("TransactionDetailCache", async () => {
    const response = await API.get(`/user`);
    console.log("ini profile",response.data.data);
    return response.data.data;
    });
    
    const [preview, setPreview] = useState()
    const [photo, setPhoto] = useState({
    image: "",
  });
  const handleChangePhoto = (e) => {
    const { name, type } = e.target;
    setPhoto({
      ...photo,
      [name]: type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      console.log("data url", url);
      setPreview(url)
    }
  };

  const handleUpdate = useMutation(async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      if (photo.image) {
        formData.set("image", photo?.image[0], photo?.image[0]?.name);
      }

      const response = await API.patch("/changephoto" , formData);
      console.log(response);
      alert("Berhasil Ganti foto" )
      
    } catch (err) {
      alert(err, "Gagal Ganti foto")
    }
  });




    return (
        <Container className="w-50">
                <h2>Personal Info</h2>
            <Row>
                <Col>
                    <Row>
                        <Col sm="2" className="d-flex justify-content-center align-items-center">
                            <img className="w-100" src={IconProfile} alt="pp" />
                        </Col>
                        <Col>
                        <h5 className="mb-0 mt-3 ms-0">{User?.fullname} </h5>
                        <p className="text-secondary mt-0">Full name</p>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm="2" className="d-flex justify-content-center align-items-center">
                            <img className="w-100" src={IconEmail} alt="pp" />
                        </Col>
                        <Col>
                        <h5 className="mb-0 mt-3 ms-0">{User?.email}</h5>
                        <p className="text-secondary mt-0">Email</p>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm="2" className="d-flex justify-content-center align-items-center">
                            <img className="w-100" src={IconPassword} alt="pp" />
                        </Col>
                        <Col>
                        <h5 onClick={handleShow} className="mb-0 mt-3 ms-0 text-primary" style={{cursor:"pointer"}}>Change Password</h5>
                        <p className="text-secondary mt-0">Password</p>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm="2" className="d-flex justify-content-center align-items-center">
                            <img className="w-100" src={IconStatus} alt="pp" />
                        </Col>
                        <Col>
                        <h5 className="mb-0 mt-3 ms-0">{User?.role}</h5>
                        <p className="text-secondary mt-0">status</p>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm="2" className="d-flex justify-content-center align-items-center">
                            <img className="w-100" src={IconGender} alt="pp" />
                        </Col>
                        <Col>
                        <h5 className="mb-0 mt-3 ms-0">{User?.gender}</h5>
                        <p className="text-secondary mt-0">Gender</p>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm="2" className="d-flex justify-content-center align-items-center">
                            <img className="w-100" src={IconPhone} alt="pp" />
                        </Col>
                        <Col>
                        <h5 className="mb-0 mt-3 ms-0">{User?.phone}</h5>
                        <p className="text-secondary mt-0">Mobile Phone</p>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm="2" className="d-flex justify-content-center align-items-center">
                            <img className="w-100" src={IconAddress} alt="pp" />
                        </Col>
                        <Col>
                        <h5 className="mb-0 mt-3 ms-0">{User?.address}</h5>
                        <p className="text-secondary mt-0">Address</p>
                        </Col>
                    </Row>
                </Col>
                <Col className="text-center pt-5">
                {preview ? (
                    <>
                        <p className="text-danger">ini hanya preview</p>
                        <img style={{objectFit:"cover", width:"300px", height:"350px", marginBottom:"2rem"}} src={preview} alt="" /> 
                    </>
                ) : (
                    <img style={{objectFit:"cover", width:"300px", height:"350px", marginBottom:"2rem"}} src={User?.image} alt="" />       
                )}
                    
          <Form onSubmit={(e) => handleUpdate.mutate(e)}>
            <Form.Group controlId="formFileLg" className="mb-3">
                <Form.Control
                        controlId="formFileLg"
                        type="file"
                        name="image"
                        onChange={handleChangePhoto}
                        required
                      />
            </Form.Group>
                    <Button type="submit" className="mt-3">Change Photo Profile</Button>
          </Form>
                </Col>
            </Row>
            <ChangePw show={show} onHide={handleClose}  />
        </Container>
    )
}