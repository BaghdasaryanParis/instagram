"use client"
import { useEffect,useState } from "react";
import Images from "@/components/images";

export default function ImagesComponent() {
  const [images, setImages] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/post/all",{
      method: "GET",
      headers:{
        Authorization: `Bearer ${token}`,
      }
    }).then(res=>res.json()).then(data=>setImages(data));
  }, []);
  return (
    <div className="flex flex-col items-center space-y-4">
      {images.map((image, index) => (
        <Images key={index} image={image} />
      ))}
    </div>
  )
}