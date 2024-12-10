import React, { useState } from "react";
import Header from "components/Header/index";
import styles from "./addItem.module.css";

function AddItems() {
  const [productImg, setProductImg] = useState(null);
  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");
  const [price, setPrice] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);

  const handleImageUpload = (e) => {
    if (e.target.files.length > 0) {
      setProductImg(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleImageDelete = () => {
    setProductImg(null);
  };

  const handleTagAdd = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleTagDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const isSubmitEnabled =
    title.trim() && info.trim() && price.trim() && tags.length > 0;

  return (
    <div>
      <Header />
      <section>
        <div className={styles["add-items"]}>
          <div className={styles["product-add"]}>
            <h1>상품 등록하기</h1>
            <button
              disabled={!isSubmitEnabled}
              className={styles["submit-btn"]}
            >
              등록
            </button>
          </div>
          <div className={styles["add-items-form"]}>
            <h2>이미지 등록하기</h2>
            <div className={styles["image-container"]}>
              {!productImg ? (
                <label className={styles["upload-label"]}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className={styles["file-input"]}
                  />
                  <div className={styles["upload-placeholder"]}>
                    <div className={styles["upload-placeholder-plus"]}>+</div>
                    <br />
                    이미지 등록
                  </div>
                </label>
              ) : (
                <div className={styles["image-preview"]}>
                  <img
                    src={productImg}
                    alt="상품 이미지 미리보기"
                    className={styles["uploaded-image"]}
                  />
                  <button
                    className={styles["delete-img-btn"]}
                    onClick={handleImageDelete}
                  >
                    X
                  </button>
                </div>
              )}
            </div>
            <div className={styles["product-title"]}>
              <h2>상품명</h2>
              <input
                type="text"
                placeholder="상품명을 입력해주세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className={styles["product-info"]}>
              <h2>상품 소개</h2>
              <textarea
                placeholder="상품 소개를 입력해주세요"
                value={info}
                onChange={(e) => setInfo(e.target.value)}
              ></textarea>
            </div>
            <div className={styles["sale-cost"]}>
              <h2>판매 가격</h2>
              <input
                type="text"
                placeholder="판매 가격을 입력해주세요"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className={styles["tag"]}>
              <h2>태그</h2>
              <input
                type="text"
                placeholder="태그를 입력해주세요"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleTagAdd()}
              />
              <div className={styles["tag-list"]}>
                {tags.map((tag) => (
                  <span key={tag} className={styles["tag-item"]}>
                    #{tag}
                    <button
                      className={styles["delete-tag-btn"]}
                      onClick={() => handleTagDelete(tag)}
                    >
                      X
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddItems;
