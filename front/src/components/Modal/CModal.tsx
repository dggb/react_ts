import React from "react";
import { commonModal } from "@/common/types/Modal/CommonModal";

const CModal: React.FC<commonModal["CModal"]> = ({
  title,
  content,
  customBtn,
  closeBtn,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-black bg-opacity-50`}
    >
      <div className="relative w-auto max-w-3xl mx-auto my-6">
        {/* 모달 본문 */}
        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
          {/* 모달 헤더 */}
          <div className="flex items-start justify-between p-5 border-b border-gray-300 border-solid rounded-t">
            <h3 className="text-3xl font-semibold">{title}</h3>
            {closeBtn && (
              <button
                className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-50 focus:outline-none"
                onClick={onClose}
              >
                <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-50 focus:outline-none">
                  ×
                </span>
              </button>
            )}
          </div>
          {/* 모달 내용 */}
          <div className="relative flex-auto p-6">{content}</div>
          {/* 모달 푸터 */}
          {customBtn && (
            <div className="flex items-center justify-end p-6 border-t border-gray-300 border-solid rounded-b">
              {/* 커스텀 버튼 */}
              <button
                className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-blue-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                type="button"
              >
                Do Something
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CModal;
