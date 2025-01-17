import React from "react";
import { useRouter } from "next/router";

const ItemDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Item Detail Page</h1>
      <p>상품 ID: {id}</p>
    </div>
  );
};

export default ItemDetail;
