import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/App.css";
import { useParams, useNavigate } from "react-router-dom";
import CloudinaryUploadWidget from "../components/CloudinaryUpload";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
const EditAnnouncement = () => {
  const [publicId, setPublicId] = useState("");
  // Replace with your own cloud name
  const [cloudName] = useState("dxkozpx6g");
  // Replace with your own upload preset
  const [uploadPreset] = useState("jcck4okm");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [event, setEvent] = useState("");
  const [eventlist, setEventlist] = useState([]);
  const [announcementData, setAnnouncementData] = useState([]);
  const { announcementid } = useParams();
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [loading, setLoading] = useState(false);

  const localhostapi= "http://localhost:5000"
  const serverlessapi = "https://adminilftest.onrender.com";

  const navigate = useNavigate();
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    cropping: true,
    multiple: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        let token = localStorage.getItem("token");

        await axios({
          headers: {
            authorization: "Bearer " + token,
          },
          method: "get",
          url: `${serverlessapi}/validateLogin`,
        })
          .then(function (response) {
            console.log(response);
            if (response.data.message == "Unauthorized access") {
              localStorage.clear();
              navigate('/login')
            }
          })
          .catch(function (response) {
            //Handle error
            console.dir(response);
          });
        const response1 = await axios.get(
          `${serverlessapi}/eventsannouncement`
        );
        setEventlist(response1.data);
        const response = await axios.get(
          `${serverlessapi}/announcements/${announcementid}`
        );
        setAnnouncementData(response.data);
        // Check if the response data is an array and set infodata accordingly
        if (Array.isArray(response.data)) {
          setAnnouncementData(response.data);
        } else {
          // If the response data is not an array, wrap it in an array
          setAnnouncementData([response.data]);
        }
        setLoading(false);

        const { title, description, eventid, image } = response.data[0]; // Assuming the data is an array
        setTitle(title);
        setDescription(description);
        setEvent(eventid);
        setPublicId(image || "");
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching information:", error);
      }
    };

    fetchData();
  }, [announcementid]);

  const validateInput = () => {
    let isValid = true;

    if (title.trim() === "") {
      setTitleError("Please enter a title");
      isValid = false;
    } else {
      setTitleError("");
    }

    if (description.trim() === "") {
      setDescriptionError("Please enter a description");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    return isValid;
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    if (!validateInput()) {
      // If input is not valid, stop the function
      return;
    }

    try {
      setLoading(true);

      const response = await axios.put(
        `${serverlessapi}/announcements/${announcementid}`,
        {
          title,
          description,
          publicId,
          event,
        }
      );
      console.log("API Response:", response.data);
      return navigate("/viewannouncements");
    } catch (error) {
      console.error("Error updating information:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${serverlessapi}/announcements/${announcementid}`
      );
      console.log("API Response:", response.data);
      return navigate("/viewannouncements");
    } catch (error) {
      console.error("Error deleting information:", error);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        announcementData.map((announcementlist) => (
          <div
            className="container mx-auto p-4"
            key={announcementlist.announcementid}
          >
            <div style={{ width: "800px" }}>
              <CloudinaryUploadWidget
                uwConfig={uwConfig}
                setPublicId={setPublicId}
              />

              <AdvancedImage
                style={{ maxWidth: "100%" }}
                cldImg={cld.image(publicId)}
                plugins={[responsive(), placeholder()]}
              />
            </div>
            <h1 className="text-2xl font-bold mb-4">Edit Announcements</h1>
            <form onSubmit={handleEdit}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-600"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`mt-1 p-2 border ${
                    titleError ? "border-red-500" : "border-gray-300"
                  } rounded-md w-full`}
                />
                {titleError && (
                  <p className="text-red-500 text-xs mt-1">{titleError}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-600"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`mt-1 p-2 border ${
                    descriptionError ? "border-red-500" : "border-gray-300"
                  } rounded-md w-full`}
                ></textarea>
                {descriptionError && (
                  <p className="text-red-500 text-xs mt-1">
                    {descriptionError}
                  </p>
                )}
              </div>
              <label
                htmlFor="eventlist"
                className="block text-sm font-medium text-gray-600"
              >
                Event list
              </label>
              <select
                id="eventlist"
                name="eventlist"
                value={event}
                onChange={(e) => setEvent(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              >
                {eventlist.map((eventlisting, index) => (
                  <option key={index} value={eventlisting.eventid}>
                    {eventlisting.title}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                style={{ width: "18%" }}
              >
                Save Announcement
              </button>
            </form>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              onClick={handleDelete}
              style={{ width: "18%" }}
            >
              Delete Information
            </button>
          </div>
        ))
      )}

      {}
    </div>
  );
};

export default EditAnnouncement;
