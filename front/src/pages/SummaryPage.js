import React from "react";
import Carousel from "../components/Carousel";

const SummaryPage = () => {
  const images = [
    "https://www.ot-lelavandou.fr/app/uploads/2023/07/port-cros-hyeres-a-tourisme-provence-mediterranee-julien-mauceri.webp",
    "https://www.espritparcnational.com/sites/default/files/2020-10/PNPC_006193Ori.jpg",
    "https://res.cloudinary.com/manawa/image/private/f_auto,c_limit,w_3840,q_auto/85247e2c250c6c1b9c94a3f96497131c",
    "https://www.rivieraloisirs.com/public/uploads/2020/06/iStock-536012111.jpg",
  ];

  return (
    <div style={{ textAlign: "center" }}>
      <Carousel images={images} height="700px" width="90%" />
    </div>
  );
};

export default SummaryPage;