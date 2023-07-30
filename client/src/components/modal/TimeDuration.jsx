import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import { useMutation } from "react-query";
import { API } from "../../config/api";
import { useNavigate } from "react-router";

export default function TimeDuration(props) {
  const navigate = useNavigate()
     const [form, setForm] = useState({
          CheckIn: "",
          CheckOut: "",
        });
  
  const { CheckIn, CheckOut } = form

  const OnChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation( async (e) => {
    try {
      e.preventDefault();

      let date1 = new Date(form.CheckIn);
      let date2 = new Date(form.CheckOut); 
      let diff = new Date(date2) - new Date(date1);

      let duration = null

      if (props.type === "Days") {
        duration = Math.ceil(diff / (1000 * 3600 * 24));
      } else if (props.type === "Months") {
        duration = Math.ceil(diff / (1000 * 3600 * 24 * 30)); 
      } else if (props.type === "Years") {
        duration = Math.ceil(diff / (1000 * 3600 * 24 * 30 * 12)); 
      }

      let price = props.price*duration

      const formData = new FormData();
      formData.set("property_id", props.id);
      formData.set("checkIn", form.CheckIn);
      formData.set("checkOut", form.CheckOut);
      formData.set("duration", duration);
      formData.set("price", price);
      const response = await API.post("/transaction", formData)
      alert("Transaksi Berhasil Dibuat!");
      console.log("ini login", response.data.data);
      navigate(`/details/${response.data.data.id}`);

    } catch (err) {
        alert("Transaksi Gagal", err)
    }
  })


    return (
        <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <h2 className="text-center mb-4">How Long you will stay</h2>
            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                <h4>Check In</h4>
                <input style={{width:"100%", height:"3em", fontSize:"20px", padding:"1em"}} type="date" name="CheckIn" value={CheckIn} onChange={OnChangeHandler} />
                <h4 className="mt-3">Check Out</h4>
                <input style={{width:"100%", height:"3em", fontSize:"20px", padding:"1em"}} type="date" name="CheckOut" value={CheckOut} onChange={OnChangeHandler} />
                <Button onClick={props.onHide} type="submit" className="container-fluid rounded-2 mt-4">
                  Submit
              </Button>
          </Form>
      </Modal.Body>
      </Modal>
    )
}
TimeDuration.propTypes = {
  show: propTypes.bool,
  onHide: propTypes.any,
  onClick: propTypes.any
}