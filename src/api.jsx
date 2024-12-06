export async function getProducts({
  page = 1,
  pageSize = 10,
  orderBy,
  keyword = "",
  totalItems,
}) {
  const params = new URLSearchParams({
    page,
    pageSize,
    // keyword가 비어있지 않은 경우에만 추가
    ...(keyword && { keyword }),
  });

  // orderBy가 있을 때만 추가
  if (orderBy) {
    params.append("orderBy", orderBy);
  }

  console.log(
    "API URL: ",
    `https://panda-market-api.vercel.app/products?${params.toString()}`
  );

  try {
    const response = await fetch(
      `https://panda-market-api.vercel.app/products?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("서버 오류");
    }

    const body = await response.json();
    return body;
  } catch (error) {
    console.error(error);
    throw new Error("데이터 오류");
  }
}
