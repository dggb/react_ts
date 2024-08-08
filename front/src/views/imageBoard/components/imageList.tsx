import React, { useState } from "react";
import { commonBoard } from "@/common/types/ImageBoard/ImageBoard.types";
import CModal from "@/components/Modal/CModal";

type ImageListProps = {
  images: commonBoard["ImageBoard"][];
};

const ImageList: React.FC<ImageListProps> = ({ images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<
    commonBoard["ImageBoard"] | null
  >(null);

  const openModal = (image: commonBoard["ImageBoard"]) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <div className="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
      {images.map((image) => (
        <div
          key={image.id}
          className="relative cursor-pointer group"
          onClick={() => openModal(image)}
        >
          <div className="w-full overflow-hidden bg-gray-200 rounded-md aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-75 h-80 sm:h-52 lg:h-80">
            <img
              src={image.download_url}
              alt={image.author}
              className="object-cover object-center w-full h-full lg:h-full lg:w-full"
            />
          </div>

          <div className="flex justify-between mt-4">
            <div>
              <h3 className="text-sm text-gray-700">
                <span aria-hidden="true" className="absolute inset-0" />
                {image.author}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{image.author}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">{image.author}</p>
          </div>
        </div>
      ))}

      {isModalOpen && selectedImage && (
        <CModal
          title={selectedImage.author}
          content={selectedImage.download_url}
          customBtn={false}
          closeBtn={true}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default ImageList;
