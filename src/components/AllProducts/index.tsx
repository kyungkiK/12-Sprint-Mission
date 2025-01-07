import React, { useState, useEffect } from "react";
import { getProducts } from "../../api";
import NavBar from "./navBar";
import ProductList from "./products";
import Pagination from "./pagination";
import styles from "./allProduct.module.css";

// Product 타입 정의
interface Product {
  id: string; // 상품 ID
  name: string; // 상품 이름
  price: number; // 상품 가격
  favoriteCount: number; // 좋아요 개수
  images: string[]; // 상품 이미지 URL 배열
}

// API에서 반환되는 데이터 타입 정의
interface ProductResponse {
  list: Product[];
  totalCount: number;
}

const PAGE_SIZES = {
  small: { max: 767, size: 4 },
  medium: { max: 1199, size: 6 },
  large: { size: 10 }, // max가 없으므로 이 조건은 기본값으로 작동
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

// 상수를 정의하고 타입 생성
const SORT_CATEGORIES = ["recent", "favorite"] as const;
type SortCategory = (typeof SORT_CATEGORIES)[number];

function AllProducts() {
  const [products, setProducts] = useState<Product[]>([]); // 상품 데이터 상태
  const [pageSize, setPageSize] = useState<number>(
    getPageSize(window.innerWidth)
  ); // 페이지 크기 상태
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 상태
  const [orderBy, setOrderBy] = useState<SortCategory>("recent"); // 정렬 기준 (최신순)
  const [totalItems, setTotalItems] = useState<number>(0); // 전체 상품 개수 상태
  const [keyword, setKeyword] = useState<string>(""); // 검색어 상태

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
        const result: ProductResponse = await getProducts({
          page: currentPage, // 현재 페이지
          pageSize, // 페이지 크기 (한 페이지당 표시할 상품 개수)
          orderBy, // 정렬 기준 (최신순 등)
          keyword, // 검색어
          totalItems, // 총 아이템 개수 (API 요청 시 사용)
        });
        setProducts(result.list); // 상품 목록 업데이트
        setTotalItems(result.totalCount); // 전체 상품 개수 업데이트
      } catch (error) {
        if (error instanceof Error) {
          console.error("데이터 로드 중 오류 발생:", error.message);
          setProducts([]); // 오류 발생 시 빈 배열로 설정
        }
      }
    };

    fetchProducts();
  }, [currentPage, pageSize, orderBy, keyword]); // keyword가 변경될 때마다 상품 데이터 가져오기

  return (
    <div className={styles.all_Container}>
      <NavBar
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        keyword={keyword}
        setKeyword={setKeyword}
      />
      <ProductList products={products} />
      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={pageSize}
        onPageChange={setCurrentPage} // 페이지 변경 시 상태 업데이트
      />
    </div>
  );
}

export default AllProducts;
