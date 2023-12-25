"use client";
import React from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  return <h1>{`Ini adalah artikel ${id}`}</h1>;
};

export default page;
