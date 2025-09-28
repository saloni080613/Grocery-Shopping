import React from 'react';
import { useLocation } from "react-router-dom";

export default function Order() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const productId = queryParams.get("productId");
  return (
    <div>
   <h1>Ordering Product ID: {productId}</h1>;
    </div>
  )
}
