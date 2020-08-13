import React from "react";
import { useHistory } from "react-router-dom";
import "./ImageGridView.css";
const ROWS_SIZE = 3;
const ROWS = Array.from(Array(ROWS_SIZE).keys());
export default function ImageGridView({ images }) {
  return (
    <div>
      {ROWS.map((val) => {
        return (
          <div key={`${val}`} className="row">
            {images
              .slice(val * ROWS_SIZE, val * ROWS_SIZE + ROWS_SIZE)
              .map((image) => (
                <div key={image.id} className="small-col">
                  <ImageCard image={image} />
                </div>
              ))}
          </div>
        );
      })}
    </div>
  );
}

function ImageCard({ image }) {
  let history = useHistory();

  function showFullScreen(image) {
    history.push(image.id);
    history.go();
  }
  return (
    <div className="card margin-small-y" onClick={() => showFullScreen(image)}>
      <img
        src={image.urls.regular}
        className="image image-fit round-border"
        alt={image.alt_description}
      />
      <div className="card-info margin-small">
        <UserInfo user={image.user} />
      </div>
    </div>
  );
}

function UserInfo({ user }) {
  return (
    <span>
      <img
        className="image image-profile image-round margin-small-x hide-on-small"
        alt={`${user.username}_profile`}
        src={user.profile_image.medium}
      />
      <span className="white-text small-text margin-large-x">
        Photo by
        <span className="blue-text username-overlay">
          {user.first_name} {user.last_name}
        </span>
      </span>
    </span>
  );
}
