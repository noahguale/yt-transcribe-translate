"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import React from "react";
import VideoForm from "@/components/VideoForm";
import Layout from "@/components/Layout";

export default function Home() {
  return (
    <>
      <Layout />
    </>
  );
}
