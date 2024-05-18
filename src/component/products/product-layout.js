"use client";

import { useState } from "react";
import Button from "../formControl/button";
import Modal from "../Model";
import { productFormControls } from "../../utils/config";
import { useRouter } from "next/navigation";

const intialFormData = {
  name: "",
  price: "",
  visitors: 0,
  sales: 0,
  month: "",
};

export default function ProductLayout({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(intialFormData);

  const router = useRouter();
  async function handleAddProduct() {
    const res = await fetch("/api/product/add-products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log("mydata is that",data)
    if (data && data.success) {
      setFormData(intialFormData);
      setShowModal(false);
      router.refresh();
    } else {
      setFormData(intialFormData);
      setShowModal(false);
    }
  }

  // async function handleAddProduct() {
  
  //   const res = await fetch("/api/product/add-products", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(formData),
  //   });
  //  console.log("my response is that ",res)
  //   const data = await res.json();
  //   console.log("my data is that ",data)
  //   if (data && data.success) {
  //     setFormData(intialFormData);
  //     setShowModal(false);
  //     router.refresh();
  //   } else {
  //     setFormData(intialFormData);
  //     setShowModal(false);
  //   }
  // }

  // }

  return (
    <div>
      <Button onClick={() => setShowModal(true)} text={"Add New Product"} />
      {children}
      <Modal
        show={showModal}
        setShow={setShowModal}
        formData={formData}
        setFormData={setFormData}
        formControls={productFormControls}
        onAdd={handleAddProduct}
      />
    </div>
  );
}