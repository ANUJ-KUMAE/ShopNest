import React, {useState} from "react";

const MyProductImage = ({ imgs = [{ url: " " }] }) => {

    const [mainImage, setMainImage] = useState(imgs[0]);

  return (
    <div className="SetImages">
      <div className="grid-four-column">
        {imgs.map((curEle, index) => {
          return (
            <figure>
              <img
                src={curEle.url}
                alt={curEle.filename}
                className="image-style"
                key={index}
                onClick={() => setMainImage(curEle)}
              />
            </figure>
          );
        })}
      </div>

      <div className="Main-Image">
        <img src={mainImage.url} alt={mainImage.filename} />
      </div>
    </div>
  );
};

export default MyProductImage;
