import React, { useState, useEffect } from "react";
import "./App.css";
import { unsplash, toJson } from "./utils/unsplashConfig";
import ImageGridView from "./components/ImageGridView/ImageGridView";

function App() {
  const [images, setImages] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // get the initial photos to display
    loadInitialImages();
  }, []);

  async function loadInitialImages() {
    let res = await unsplash.search
      .photos("monument", 1, 9, {
        orientation: "landscape"
      })
      .then(toJson);
    let data = res.results;
    setImages(data);
  }

  const handleSearchTextChange = (e) => {
    if (currentPage !== 1 || totalPages !== 1) {
      setCurrentPage(1);
      setTotalPages(1);
    }
    setSearchText(e.target.value);
  };

  const searchImages = () => {
    // if text is empty show error
    if (searchText === "") {
      console.log("Enter search text");
      return;
    }
    getPhotos(searchText, 1);
  };

  const loadMoreImages = () => {
    if (!searchText || searchText === "") {
      return;
    }
    getPhotos(searchText, currentPage + 1);
  };

  function getPhotos(searchText, pageNumber) {
    if (pageNumber > totalPages) {
      console.log("Page Limit exceeded");
    }
    setCurrentPage(pageNumber);
    unsplash.search
      .photos(searchText, pageNumber, 9, { orientation: "landscape" })
      .then(toJson)
      .then((json) => {
        setImages(json.results);
        setTotalPages(json.total_pages);
      });
  }

  return (
    <div className="main-container">
      <div className="row justify-content-center margin-large-y">
        <div className="search-col">
          <div className="searchBox">
            <input
              className="searchInput"
              id="search"
              type="text"
              value={searchText}
              onChange={handleSearchTextChange}
              placeholder="Search for images here..."
            />

            <button className="searchBtn" onClick={searchImages}>
              <i className="fas fa-search white-text"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="row justify-content-center padding-large-y">
        <ImageGridView images={images} />
      </div>
      <div className="row justify-content-center margin-large-y">
        <button onClick={loadMoreImages} className="loadMoreBtn">
          Load More
        </button>
      </div>
    </div>
  );
}

export default App;
