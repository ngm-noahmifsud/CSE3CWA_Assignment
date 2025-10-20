import React from "react";
import Image from "next/image";

interface PlayScreenProps {
  /** Number of stages completed (0–3) */
  stagesComplete: number;
  /** Optional alt text */
  alt?: string;
  /** Optional class names */
  className?: string;
}

const PlayScreen: React.FC<PlayScreenProps> = ({
  stagesComplete,
  alt = "Stage Image",
  className = "",
}) => {
  // Determine the image based on completed stages
  let src = "/images/Room1.png";

  switch (stagesComplete) {
    case 0:
      src = "/images/Room1.png";
      break;
    case 1:
      src = "/images/Room2.png";
      break;
    case 2:
      src = "/images/Room3.png";
      break;
    default:
      src = "/images/Room1.png";
      break;
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={800}
        height={450}
        className="object-contain rounded-2xl"
      />
    </div>
  );
};

export default PlayScreen;
