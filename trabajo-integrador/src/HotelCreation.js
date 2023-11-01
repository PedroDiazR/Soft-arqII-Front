import { Container, Row, Col, Navbar, Nav, Form, Button } from 'react-bootstrap';
import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Select from 'react-select';

function HotelCreation() {
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(null);
    const [hotelName, setHotelName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const amenitiesOptions = [
        { value: 'Piscina', label: 'Piscina' },
        { value: 'Wifi gratuito', label: 'Wifi gratuito' },
        { value: 'Gimnasio', label: 'Gimnasio' },
        { value: 'Restaurante', label: 'Restaurante' },
      ];

    const handleImageChange = (e) => {
        const files = e.target.files;
        const imageArray = Array.from(files).map((file) => URL.createObjectURL(file));

        if (imageUrls.length === 0) {
            setImageUrls(imageArray);
        } else {
            setImageUrls((prevUrls) => [...prevUrls, ...imageArray]);
        }

        imageArray.forEach((url, index) => {
            console.log(`Image ${index + 1} added to the array: ${url}`);
        });

        console.log("Updated imageUrls array:", imageUrls);
    };

    const uploadImages = async () => {
        createRequestBody(); // This function creates the request body
        const selectedValues = selectedAmenities.map((option) => option.value);
        try {
            const response = await fetch("http://localhost:8000/insertHotel", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Specify that you're sending JSON data
                },
                body: JSON.stringify({ // Convert the request body to a JSON string
                    name: hotelName,
                    description: description,
                    fotos: imageUrls,
                    amenities: selectedValues,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setUploadedImages(data.uploadedUrls);
                console.log("Images uploaded successfully.");
            } else {
                console.error("Failed to upload images.");
            }
        } catch (error) {
            console.error("Error while uploading images:", error);
        }
    };

    const logCurrentImageURL = () => {
        if (currentImageIndex !== null) {
            console.log(`URL of the current image: ${imageUrls[currentImageIndex]}`);
        } else {
            console.log("No image selected.");
        }
    };

    const handleAmenitiesChange = (selectedOptions) => {
        setSelectedAmenities(selectedOptions);
        console.log('Selected Amenities:', selectedOptions);
      };

    const createRequestBody = () => {
        const requestBody = {
            name: hotelName,
            description: description,
            fotos: imageUrls,
            amenities: selectedAmenities,
        };
        console.log("Request Body:", requestBody);
    };

    return (
        <Container>
          <h2>Registro de hotel</h2>
          <Row>
            <Col md={6}>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
              {imageUrls.length > 0 && (
                <Carousel showArrows={true} onChange={setCurrentImageIndex}>
                  {imageUrls?.map((url, index) => (
                    <div key={index}>
                      <img
                        src={url}
                        alt={`Image ${index}`}
                        style={{ maxWidth: "200px", maxHeight: "200px" }}
                      />
                    </div>
                  ))}
                </Carousel>
              )}
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Ingresar nombre"
                  value={hotelName}
                  onChange={(e) => {
                    setHotelName(e.target.value);
                    console.log("Hotel Name:", e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  placeholder="Ingresar Descripción"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    console.log("Description:", e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Select
                  isMulti
                  options={amenitiesOptions}
                  value={selectedAmenities}
                  onChange={handleAmenitiesChange}
                />
              </Form.Group>
              <Button
                onClick={uploadImages}
                variant="primary"
                type="submit"
              >
                Registrar Hotel
              </Button>
            </Col>
          </Row>
          <div>
            {uploadedImages?.map((url, index) => (
              <div key={index}>
                <p>Image {index + 1} uploaded: {url}</p>
              </div>
            ))}
          </div>
        </Container>
      );
    }
    
    export default HotelCreation;
    