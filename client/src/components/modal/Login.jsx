import { useContext, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { API, setAuthToken } from "../../config/api";
import { UserContext } from "../../context/usercontext";

export default function Login(props) {
    const [, dispatch ] = useContext(UserContext)
    const navigate = useNavigate()

     const [formLogin, setFormLogin] = useState({
          Username: "",
          Password: "",
        });
  
  const { Username, Password } = formLogin

  const OnChangeHandler = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation( async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/login", formLogin)
      alert("Login Success!");
      console.log("ini login", response.data.data);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data,
      });

      setAuthToken(response.data.data.token);
      console.log(response.data.data);
       if (response.data.data.role === "owner") {
        navigate('/transactions');
      } else {
        navigate("/");
      }

      setFormLogin({
        Username: "",
        Password: "",
      })

      props.onHide();

    } catch (err) {
        alert("GAGAL LOGIN BRO", err)
    }
  })

    return (
        <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <h1 className="formTitle">LOGIN</h1>
            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
              <FloatingLabel controlid="username" label="Username" className="mb-3">
                  <Form.Control
                      type="text"
                      placeholder="example"
                      controlid='username'
                      name='Username'
                      value={Username}
                      onChange={OnChangeHandler}
                      />
                      
              </FloatingLabel>
              <FloatingLabel controlId="password" label="Password" className="mb-5">
                  <Form.Control
                      type="password"
                      placeholder="Password"
                      controlid='password'
                      name='Password'
                      value={Password}
                      onChange={OnChangeHandler}
                      />
              </FloatingLabel>
              <Button onClick={props.onHide} type="submit" className="container-fluid rounded-2 grad">
                  Submit
              </Button>
          </Form>
            <p className="text-center mt-3">
            Belum Punya Akun ? Klik{" "}
            <span onClick={props.onClick} className="fw-bold" style={{ cursor: "pointer" }}>
              Disini
            </span>
          </p> 
      </Modal.Body>
      </Modal>
    )
}

Login.propTypes = {
  show: propTypes.bool,
  onHide: propTypes.any,
  onClick: propTypes.any
}