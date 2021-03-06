import React from 'react'

type Props = {}

export default function FullPageLoading({}: Props) {
    const lang = window.localStorage.getItem("lang");
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full z-50 overflow-hidden bg-gray-700 bg-opacity-30 flex flex-col items-center justify-center">
	<div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
	<h2 className="text-center text-white text-xl font-semibold">{lang === "en" ? "Loading..." : "Đang tải"}</h2>
	<p className="w-1/3 text-center text-white">{lang === "en"? "This may take a few seconds, please don't close this page.": "Vui lòng chờ trong giây lát!"}</p>
    </div>
  )
}