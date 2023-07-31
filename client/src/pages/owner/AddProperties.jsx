import { useState } from "react";
import { Form,FloatingLabel,Button, Container } from "react-bootstrap";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { API } from "../../config/api";


export default function AddProperties() {
    const navigate = useNavigate()
    
    const [preview, setPreview] = useState()
    const [form, setForm] = useState({
    Name : "" ,     
	City : "" , 
	Address : "" ,           
	Price   : "" ,   
	Type : "" ,   
	Amenity   : [], 
	Bedroom : "" , 
	Bathroom : "" , 
	Description : "" , 
    Image : "" , 
  });


  const { Name, City, Address, Price, Type, Amenity, Bedroom, Bathroom, Description } = form;
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      let newAmenity = [...form.Amenity];
      if (checked) {
        newAmenity.push(value);
      } else {
        newAmenity = newAmenity.filter((amenity) => amenity !== value);
      }
      setForm({ ...form, Amenity: newAmenity });
    } else {
      setForm({
        ...form,
        [name]: type === "file" ? e.target.files : e.target.value,
      });
    }

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      console.log("ini data blob", url);
      setPreview(url);
    }

    console.log("ini log input add property" , form)

  };

  const handleSubmit = useMutation( async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };


        const formData = new FormData();
        formData.set("name", form.Name);
        formData.set("city", form.City);
        formData.set("address", form.Address);
        formData.set("price", form.Price);
        formData.set("type", form.Type);
        formData.set("amenity", JSON.stringify(form.Amenity));
        formData.set("bedroom", form.Bedroom);
        formData.set("bathroom", form.Bathroom)
        formData.set("description", form.Description);
        formData.set("image", form.Image[0])

        const response = await API.post("/add-properties", formData, config);

        alert("Add ticket Success!");

      console.log("Add Property Success : ", response);

     
      navigate("/transactions")
    } catch (err) {
        alert("Failed to Add Ticket!", err);      
    }
    
  });

 

    return (
        <Container>
        <h2 className="mt-5 mb-3">Add Property</h2>
        
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            
            <FloatingLabel controlId="Name" label="Name Property" className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="example"
                    controlId='Name'
                    value={Name}
                    name='Name'
                    onChange={handleChange}
                    />
            </FloatingLabel>

            <FloatingLabel controlId="City" label="City" className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="example"
                    controlId='City'
                    value={City}
                    name='City'
                    onChange={handleChange}/>
            </FloatingLabel>

            <FloatingLabel controlId="Description" label="Descripstion" className="mb-3">
                <Form.Control
                    type="Text"
                    placeholder="example"
                    controlId='Description'
                    value={Description}
                    name='Description'
                    onChange={handleChange}/>
            </FloatingLabel>

            <FloatingLabel controlId="Address" label="Address" className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="example"
                    controlId='Address'
                    value={Address}
                    name='Address'
                    onChange={handleChange} />
            </FloatingLabel>
            
            <Form.Label controlId="Type">Type of Rent</Form.Label>
            <Form.Select className="mb-3"
            aria-label="Default select example"
            controlId="Type"
            name="Type"
            onChange={handleChange}
            value={Type}>
                    <option value="" >Pilih disini</option>
                    <option value="Days"> Days </option>
                    <option value="Months"> Months </option>
                    <option value="Years"> Years </option>
            </Form.Select>
            
            <br />
            <Form.Label>Amenity</Form.Label>
            <Form.Group className="mb-3 d-flex gap-5" controlId="Amenity">
                <Form.Check
                onChange={handleChange}
                checked={Amenity.includes("Furnished")}
                value="Furnished"
                type="checkbox"
                label="Furnished"
                />
                <Form.Check
                onChange={handleChange}
                checked={Amenity.includes("Pet Allowed")}
                value="Pet Allowed"
                type="checkbox"
                label="Pet Allowed"
                />
                <Form.Check
                onChange={handleChange}
                checked={Amenity.includes("Shared Accomodation")}
                value="Shared Accomodation"
                type="checkbox"
                label="Shared Accomodation"
                />
            </Form.Group>

            <FloatingLabel label="Price" className="mb-3">
                <Form.Control
                    type="Text"
                    placeholder="example"
                    value={Price}
                    name='Price'
                    onChange={handleChange}/>
            </FloatingLabel>
            
            
            <Form.Select className="mb-3"
            aria-label="Default select example"
            name="Bedroom"
            onChange={handleChange}
            value={Bedroom}>
                    <option value="" >Pilih disini</option>
                    <option value="1"> 1 </option>
                    <option value="2"> 2 </option>
                    <option value="3"> 3 </option>
                    <option value="4"> 4 </option>
                    <option value="5"> 5 </option>
            </Form.Select>

            <Form.Label>Bathroom</Form.Label>
            <Form.Select className="mb-3"
            aria-label="Default select example"
            name="Bathroom"
            onChange={handleChange}
            value={Bathroom}>
                    <option value="" >Pilih disini</option>
                    <option value="1"> 1 </option>
                    <option value="2"> 2 </option>
                    <option value="3"> 3 </option>
                    <option value="4"> 4 </option>
                    <option value="5"> 5 </option>
            </Form.Select>

            {preview && (
            <div className="mb-2">
              <img
                src={preview}
                style={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  objectFit: "cover",
                }}
                alt={preview}
              />
            </div>
          )}

            <Form.Group controlId="formFileLg" className="mb-3">
                <Form.Label>Upload your Properties photo</Form.Label>
                <Form.Control type="file" name="Image" onChange={handleChange} size="lg" />
            </Form.Group>

            <div className="d-flex justify-content-center my-5">
            <Button type="submit" className="w-25 rounded bg-success mx-auto">
                Submit
            </Button>
            </div>
          </Form>
        </Container>
    )
}