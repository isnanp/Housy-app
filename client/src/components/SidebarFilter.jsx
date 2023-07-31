
import { Button, Col, Form, Row, ToggleButton, ToggleButtonGroup } from "react-bootstrap";


export default function Filter(props) {

    const OnChangeHandler = () => {
    props.setPrice(document.getElementById("price").value)
  };

  const ResetFilter = () => {
      props.setSearch("")
      props.setBtnType(null)
      props.setBedroom(null)
      props.setBathroom(null)
      props.setPrice("")
    alert("Reset Berhasil")
    }
    console.log("ini price sidebar ", props.Price)


    return (
        <>

                <Form onSubmit={() => props.refetch()} className="border-end pe-3">
                <h4 className="">Type of Rent</h4>
                    <ToggleButtonGroup
                        type="radio"
                        name="typeOfRent"
                        className="d-flex gap-3"
                    >
                        <ToggleButton
                            className="mb-2"
                            id="toggle-check1"
                            type="checkbox"
                            variant="outline-primary"
                            value={props.type === "Days"}
                            onClick={() => props.setBtnType("Days")}
                        >
                            Days
                        </ToggleButton>

                        <ToggleButton
                            className="mb-2"
                            id="toggle-check2"
                            type="checkbox"
                            variant="outline-primary"
                            value={props.type === "Months"}
                            onClick={() => props.setBtnType("Months")}
                        >
                            Months
                        </ToggleButton>

                        <ToggleButton
                            className="mb-2"
                            id="toggle-check3"
                            type="checkbox"
                            variant="outline-primary"
                            value={props.type === "Years"}
                            onClick={() => props.setBtnType("Years")}  
                        >
                            Years
                        </ToggleButton>

                    </ToggleButtonGroup>
                <h4 className="mt-3">Date</h4>
                <input style={{width:"100%"}} type="date" />

                <h4 className="mt-3">Property Room</h4>
                <p className="">Bedroom</p>

                    <ToggleButtonGroup
                        type="radio"
                        name="Bedroom"
                        className="d-flex gap-3"
                    >

                         <ToggleButton
                            className="mb-2"
                            id="toggle1"
                            type="checkbox"
                            variant="outline-primary"
                            value={props.Bedroom === "1"} 
                            onClick={() => props.setBedroom("1")}  
                        >
                            1
                        </ToggleButton>

                        <ToggleButton
                            className="mb-2"
                            id="toggle2"
                            type="checkbox"
                            variant="outline-primary"
                            value={props.Bedroom === "2"}
                            onClick={() => props.setBedroom("2")} 
                        >
                            2
                        </ToggleButton>

                        <ToggleButton
                            className="mb-2"
                            id="toggle3"
                            type="checkbox"
                            variant="outline-primary"
                            value={props.Bedroom === "3"}
                            onClick={() => props.setBedroom("3")}  
                        >
                            3
                        </ToggleButton>

                        <ToggleButton
                            className="mb-2"
                            id="toggle4"
                            type="checkbox"
                            variant="outline-primary"
                            value={props.Bedroom === "4"}
                            onClick={() => props.setBedroom("4")} 
                        >
                            4
                        </ToggleButton>

                        <ToggleButton
                            className="mb-2"
                            id="toggle5"
                            type="checkbox"
                            variant="outline-primary"
                            value={props.Bedroom === "5"}
                            onClick={() => props.setBedroom("5")}  
                        >
                            5+
                        </ToggleButton>
                    </ToggleButtonGroup>


                    <p className="">Bathroom</p>
                    <ToggleButtonGroup
                        type="radio"
                        name="Bathroom"
                        className="d-flex gap-3"
                    >

                         <ToggleButton
                            className="mb-2"
                            id="togglebtn1"
                            type="checkbox"
                            variant="outline-primary"
                            value={props.Bathroom === "1"}
                            onClick={() => props.setBathroom("1")}  
                        >
                            1
                        </ToggleButton>

                        <ToggleButton
                            className="mb-2"
                            id="togglebtn2"
                            type="checkbox"
                            variant="outline-primary"
                            value={props.Bathroom === "2"} 
                            onClick={() => props.setBathroom("2")} 
                        >
                            2
                        </ToggleButton>

                        <ToggleButton
                            className="mb-2"
                            id="togglebtn3"
                            type="checkbox"
                            variant="outline-primary"
                            value={props.Bathroom === "3"}
                            onClick={() => props.setBathroom("3")} 
                        >
                            3
                        </ToggleButton>

                        <ToggleButton
                            className="mb-2"
                            id="togglebtn4"
                            type="checkbox"
                            variant="outline-primary"
                            value={props.Bathroom === "4"}
                            onClick={() => props.setBathroom("4")} 
                        >
                            4
                        </ToggleButton>

                        <ToggleButton
                            className="mb-2"
                            id="togglebtn5"
                            type="checkbox"
                            variant="outline-primary"
                            value={props.Bathroom === "5"}
                            onClick={() => props.setBathroom("5")}  
                        >
                            5+
                        </ToggleButton>
                    </ToggleButtonGroup>

                    <h4 className="mt-3">Amenities</h4>

                    <div className="d-flex justify-content-between">
                        <label className="text-secondary" htmlFor="">
                        Furnished
                        </label>
                        <Form.Check aria-label="option 1" />
                    </div>
                    <div className="d-flex justify-content-between">
                        <label className="text-secondary" htmlFor="">
                        Pet Allowed
                        </label>
                        <Form.Check aria-label="option 1" />
                    </div>
                    <div className="d-flex justify-content-between">
                        <label className="text-secondary" htmlFor="">
                        Shared Accomodation
                        </label>
                        <Form.Check aria-label="option 1" />
                    </div>

                    <h4 className="mt-3">Budget</h4>

                    <Form.Group
                        as={Row}
                        className="mb-0"
                    >
                        <Form.Label column sm="5">
                        Less than IDR.
                        </Form.Label>
                        <Col>
                        <Form.Control required id="price" name="price" onChange={OnChangeHandler} value={props.Price} type="text" placeholder="900000" className="bg" />
                        </Col>
                    </Form.Group>
                    <div className="d-flex justify-content-between mt-3">
                        <Button onClick={() => { ResetFilter()}}>
                            Reset Filter
                        </Button>
                        <Button type="submit">
                            Apply Filter
                        </Button>
                    </div>
                </Form>
        </>
    )
}