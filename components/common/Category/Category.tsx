import Image from "next/image";
import React from "react";

function Category() {
  return (
    <div>
      Category page
      <Image src="/images/bike.svg" width={100} height={100} alt="bike" />
    </div>
  );
}

export default Category;
