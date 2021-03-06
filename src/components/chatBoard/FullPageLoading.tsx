import React from 'react';

type Props = {
  className?: string;
};

export default function FullPageLoading({ className }: Props) {
  const lang = window.localStorage.getItem('lang');
  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 w-full z-50 overflow-hidden bg-gray-700 bg-opacity-75 flex flex-col items-center justify-center ${
        className ? className : ''
      }`}
    >
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
      <h2 className="text-center text-white text-xl font-semibold">
        {lang === 'en' ? 'Loading...' : 'Đang tải'}
      </h2>
      <p className="w-1/3 text-center text-white">
        {lang === 'en'
          ? "This may take a few seconds, please don't close this page."
          : 'Vui lòng chờ trong giây lát!'}
      </p>
    </div>
  );
}
