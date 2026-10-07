"use client";
import { useEffect, useState } from "react";

export default function BanglaDate() {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
      }),
    );
  }, []);

  return <p>{date}</p>;
}
