import styles from "./best.module.css";
import heartIcon from "../../assets/img/logo/heartIcon.svg";
import { getProducts } from "../../api.ts";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Product } from "../../types"; // Product 타입 임포트
import React from "react";

const PAGE_SIZES = {
  small: { max: 767, size: 1 },
  medium: { max: 1199, size: 2 },
  large: { size: 4 }, // max가 없으므로 이 조건은 기본값으로 작동
};

// 페이지 크기 계산 함수의 인수 타입
function getPageSize(width: number): number {
  if (width <= PAGE_SIZES.small.max) {
    return PAGE_SIZES.small.size;
  } else if (width <= PAGE_SIZES.medium.max) {
    return PAGE_SIZES.medium.size;
  } else {
    return PAGE_SIZES.large.size;
  }
}

function Best() {
  const [products, setProducts] = useState<Product[]>([]); // 상품 데이터 상태 (Product[] 타입)
  const [pageSize, setPageSize] = useState<number>(
    getPageSize(window.innerWidth)
  ); // 페이지 크기 상태

  // 화면 크기 변경 시 페이지 크기 재조정 (반응형 디자인 처리)
  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize(window.innerWidth)); // 새로운 화면 크기 반영
    };

    window.addEventListener("resize", handleResize); // 화면 크기 변화 이벤트 리스너 추가

    return () => {
      window.removeEventListener("resize", handleResize); // 컴포넌트 언마운트 시 이벤트 리스너 제거
    };
  }, []);

  // 상품 데이터를 API에서 가져오는 함수
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await getProducts({
          page: 1,
          pageSize: pageSize, // 페이지 크기 (한 페이지당 표시할 상품 개수)
          orderBy: "favorite", // 정렬 기준 (인기 순)
          keyword: "",
        });
        setProducts(result.list); // 상품 데이터 업데이트
      } catch (error) {
        console.error("데이터 로드 중 오류 발생:", error.message);
        setProducts([]); // 오류 발생 시 빈 배열로 설정
      }
    };

    fetchProducts();
  }, [pageSize]); // pageSize가 변경될 때마다 상품 데이터를 가져옴

  return (
    <div className={styles.best_Container}>
      <h2 className={styles.title}>베스트 상품</h2>
      <ul className={styles.best_list}>
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product.id} className={styles.best_card}>
              <Link to={`/items/${product.id}`} className={styles.product_link}>
                {product.images.length > 0 && (
                  <div className={styles.product_image_box}>
                    <img
                      className={styles.product_image}
                      src={product.images[0]}
                      alt={product.name}
                    />
                  </div>
                )}

                <h3 className={styles.product_name}>{product.name}</h3>
                <p className={styles.product_price}>{product.price}원</p>
                <div className={styles.heart_line}>
                  <img
                    className={styles.heart_image}
                    src={heartIcon}
                    alt="좋아요 하트 기호"
                  />
                  <span className={styles.heart_num}>
                    {product.favoriteCount}
                  </span>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <p>No Products</p> // 상품이 없을 경우
        )}
      </ul>
    </div>
  );
}

export default Best;
