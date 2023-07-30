import { useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import { useMutation } from "react-query";
import { API } from "../../config/api";

export default function ChangePw(props) {
     const [form, setForm] = useState({
          old_password: "",
          new_password: "",
          new_password_confirm: "",
        });
  
  const { old_password, new_password, new_password_confirm } = form

  const OnChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation( async (e) => {
    try {
      e.preventDefault();
      const response = await API.patch("/changepw", form);

      alert(`Hey ${response.data.data.fullname}! ,Change Password Success!`);
        

      setForm({
          old_password: "",
          new_password: "",
          new_password_confirm: "",
      });

      

    } catch (err) {
        alert("Failed to Change Password!");
          
    }
    props.onHide()
  });


    return (
        <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <h1 className="formTitle">Change Password</h1>
            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
              <FloatingLabel controlId="username" label="Old Password" className="mb-3">
                  <Form.Control
                      type="password"
                      placeholder="example"
                      controlId='username'
                      name='old_password'
                      value={old_password}
                      onChange={OnChangeHandler}
                      />
                      
              </FloatingLabel>
              <FloatingLabel controlId="password" label="New Password" className="mb-3">
                  <Form.Control
                      type="password"
                      placeholder="Password"
                      controlId='password'
                      name='new_password'
                      value={new_password}
                      onChange={OnChangeHandler}
                      />
              </FloatingLabel>
              <FloatingLabel controlId="password" label="New Password Comfirm" className="mb-5">
                  <Form.Control
                      type="password"
                      placeholder="Password"
                      controlId='password'
                      name='new_password_confirm'
                      value={new_password_confirm}
                      onChange={OnChangeHandler}
                      />
              </FloatingLabel>
              {new_password !== new_password_confirm | new_password ==="" | new_password_confirm === "" ? (
                <>
                  <p className="text-danger">Password harus sama dan diisi !</p>
                  <Button onClick={props.onHide} type="submit" className="container-fluid rounded-2 grad" disabled>
                    Submit
                  </Button>
                </>
              ) : (  
                <Button onClick={props.onHide} type="submit" className="container-fluid rounded-2 grad">
                    Submit
                </Button>
              )}
          </Form>
      </Modal.Body>
      </Modal>
    )
}
ChangePw.propTypes = {
  show: propTypes.bool,
  onHide: propTypes.any,
  onClick: propTypes.any
}