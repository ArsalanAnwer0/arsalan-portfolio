import React from "react";

interface HoverImageProps {
  word: string;
  image: string;
  setHoveredImage: (image: string | null) => void;
}

const HoverImage: React.FC<HoverImageProps> = ({ word, image, setHoveredImage }) => {
  return (
    <span
      className="hoverable-word elegant-underline"
      onMouseEnter={() => setHoveredImage(image)}
      onMouseLeave={() => setHoveredImage(null)}
    >
      {word}
    </span>
  );
};

export default HoverImage;
