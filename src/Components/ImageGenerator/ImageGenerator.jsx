import React from "react";
import { useRef, useState } from "react";
import "./ImageGenerator.css";
import default_image from "../Assets/pro.jpeg";

const ImageGenerator = () => {
  const [image_url, setimage_url] = useState("/");
  const [loading, setloading] = useState(false);
  let inputRef = useRef(null);
  const ImageGenerator = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }
    setloading(true);
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "content-Type": "appplication/json",
          Authorization:
            "Bearer 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",
          "User-Agent": "Chrome",
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1,
          size: "512x512",
        }),
      }
    );
    let data = await response.json();
    console.log(data);
    let data_array = data.data;
    setimage_url(data_array[0].url);
    setloading(false);
  };
  return (
    <div className="ai-image-generator">
      <div className="header">
        Ai image <span>generator</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img src={image_url === "/" ? default_image : image_url} alt="" />
        </div>
        <div className="loading">
          <div className={loading ? "loading-bar-full" : "loading-bar"}>
            <div className={loading ? "loading-text" : "display-none"}>
              Loading...
            </div>
          </div>
        </div>
      </div>
      <div className="search-box">
        <input
          type="text"
          ref={inputRef}
          className="search-input"
          placeholder="Describe What you want to see"
        />
        <div
          className="generate-btn"
          onClick={() => {
            ImageGenerator();
          }}
        >
          Generate
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
