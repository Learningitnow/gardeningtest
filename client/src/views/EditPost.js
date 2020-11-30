import axios from "axios";
import "./Post.css";
import React, { useState } from "react";
import API from "../utils/API";
import { Button, Modal } from "react-bootstrap";

// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";

function Post() {
  let image = "";

  const [formData, setFormData] = useState({

  });

  const [isOpen, setIsOpen] = useState(false);

  const hideModal = () => {
    setIsOpen(false);
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSelectChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    console.log(event.target.value);
    // now change the image, grab the new one
    try {
      const response = await axios.get(
        "https://trefle.io/api/v1/plants/search?token=3pk9iwkeL7wAnJqrszRjMIdNfRaMqGyYvx156aJPj2g&q=" +
          event.target.value
      );
      console.log(response);

      if (response) {
        image = response.data.data[0].image_url; // or wahtever the URL
      }
      setFormData({ ...formData, [name]: value, image });
    } catch (error) {
      console.log(error.message);
      setFormData({ ...formData, [name]: "" });
    }
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    // console.log(`Looking what's in image: `, image)
    // formData.imageUrl = image
    await API.savePost({
      title: formData.title,
      imageUrl: formData.image,
      name: formData.name,
      status: formData.status,
      sqft: formData.sqft,
      description: formData.description,
      // postDate: formObject.postDate,
      plantedDate: formData.plantedDate,
      harvestDate: formData.harvestDate,
    });

    setIsOpen(true);

    setFormData({
      title: "",
      imageUrl: "",
      name: "",
      status: "",
      sqft: "",
      description: "",
      // postDate: "",
      plantedDate: "",
      harvestDate: "",
    });
  }

  return (
    <div className="main">
      <div className="pageTitle">
        <center>
          <h1>New Post</h1>
        </center>
      </div>

      <form>
        <input
          value={formData.title}
          onChange={handleChange}
          name="title"
          className="form-control form-control-lg"
          type="text"
          placeholder="Post Title"
        />

        <div>
          <br></br>
        </div>

        <div className="row">
          <div className="form-group col-6">
            <label className="fieldLabel" for="exampleFormControlSelect1">
              Plant Name
            </label>
            <input
              value={formData.name}
              onChange={handleChange}
              name="name"
              type="text"
              class="form-control"
              id="exampleFormControlSelect1"
              placeholder="Enter your plant name here ..."
            />
            <button className="btn btn-primary" value={formData.name} onClick={handleSelectChange}>Search for picture</button>

            <div>
              <br></br>
            </div>

            <div className="form-check form-check-inline">
              <label className="fieldLabel" for="sqFootage">
                Sq. Footage
              </label>
              <div className="col-sm-5">
                <input
                  className="form-control"
                  id="sqFootage"
                  name="sqft"
                  onChange={handleChange}
                  value={formData.sqft}
                />
              </div>
              <small className="fieldLabel text-muted" id="sqFootageInline">
                sq. ft.{" "}
              </small>
            </div>

            <div>
              <br></br>
            </div>

            <div className="form-check form-check-inline">
              <label className="fieldLabel" for="date-planted">
                Date Planted
              </label>
              <div className="col-sm-6">
                {/* <div className="form-group">
                  <label>Date: </label> */}
                {/* <div>
                                        <DatePicker />
                                    </div> */}
                {/* </div> */}
                <input
                  className="form-control"
                  id="date-planted"
                  placeholder="MM/DD/YYYY"
                  name="plantedDate"
                  onChange={handleChange}
                  value={formData.plantedDate}
                />
              </div>
            </div>
          </div>

          <div className="col-1"></div>

          <div className="card col-5">
            <img
              src={formData.image || "https://via.placeholder.com/320x352"}
              className="card-img-top responsive"
              alt="..."
              name="imageUrl"
            />
            <div className="card-body">
              <p className="fieldLabel card-text">Plant Image</p>
            </div>
          </div>
        </div>

        <div>
          <br></br>
        </div>

        <div id="crop-status">
          <label className="fieldLabelCrop" for="crop-status">
            Crop Status
          </label>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="status"
              id="inlineRadio1"
              value="Just Planted"
              onChange={handleChange}
            />
            <label className="fieldLabel form-check-label" for="inlineRadio1">
              Just planted
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="status"
              id="inlineRadio1"
              value="Seedling"
              onChange={handleChange}
            />
            <label className="fieldLabel form-check-label" for="inlineRadio1">
              <i className="fas fa-seedling"></i> Seedling
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="status"
              id="inlineRadio3"
              value="Ready for Harvest"
              onChange={handleChange}
            />
            <label className="fieldLabel form-check-label" for="inlineRadio3">
              <i className="fas fa-carrot"></i> Ready for Harvest
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="status"
              id="inlineRadio1"
              value="Harvested"
              onChange={handleChange}
            />
            <label className="fieldLabel form-check-label" for="inlineRadio1">
              Harvested
            </label>
          </div>
        </div>

        <div>
          <br></br>
        </div>

        <div className="form-group">
          <label className="fieldLabel" for="exampleFormControlTextarea1">
            Field Notes
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Last watered, observations..."
            name="description"
            onChange={handleChange}
            value={formData.description}
          ></textarea>
        </div>

        <div>
          <br></br>
        </div>

        <center>
          <button
            type="submit"
            onClick={handleFormSubmit}
            className="btn btn-primary mb-2"
          >
            Post
          </button>
        </center>
      </form>
      <Modal
        show={isOpen}
        onHide={hideModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="d-block text-center justify-content-center">
          <Modal.Title className="modalTitle">Post Added!</Modal.Title>
        </Modal.Header>
        <Modal.Footer className="d-block text-center justify-content-center">
          <Button className="modalBtn" variant="primary" href="/feed">
            View Feed
          </Button>
          <Button className="modalBtn" variant="secondary" onClick={hideModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Post;
