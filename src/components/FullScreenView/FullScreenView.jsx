import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./FullScreenView.css";
import { unsplash, toJson } from "../../utils/unsplashConfig";

export default function FullScreenView() {
  let history = useHistory();
  let [image, setImage] = useState({});
  let [fileName, setFileName] = useState("");
  let { photoId } = useParams();

  useEffect(() => {
    // get the photo with id from the path variable
    getPhoto();
  }, []);

  async function getPhoto() {
    let response = await unsplash.photos.getPhoto(photoId).then(toJson);
    console.log(response)
    setFileName(response && response.user && response.user.username + "-" + response.user.id  + "-" + response.id + ".jpg")
    setImage(response);
  }

  function closeAndGoBack() {
    history.push("/");
    history.go();
  }

  return (
    <div className="overlay">
      <div className="overlay-content">
        <button
          onClick={closeAndGoBack}
          className="closebtn"
          style={{ color: "white" }}
        >
          &times;
        </button>
        <div className="overlay-flex">
          <div className="user-info-wrapper">
            {<UserInfo user={image.user} />}
          </div>
          <div className="justify-content-center image-wrapper ">
            <img
              className="image image-fit round-border"
              src={image.urls && image.urls.full}
              alt={image.alt_description}
            />
          </div>
          <div className="download-button-wrapper">
            <a className="downloadPhoto" href={(image.urls && image.urls.raw) + `&dl=${fileName}`} download>
                Download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserInfo({ user }) {
  return user ? (
    <div className="row user-row no-margin no-padding">
      <img
        className="user-image-round no-margin no-padding"
        alt={user.username}
        src={user.profile_image.medium}
      />
      <span className="user-full-name no-margin no-padding">
        <span className="username">
          {user.first_name} {user.last_name}
        </span>
        <br />
        <span className="blue-text">@{user.username}</span>
      </span>
    </div>
  ) : null;
}
