import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useEffect, useRef, useState, type ChangeEvent } from "react";

interface ImageInputProps {
  onFileSelect: (file: File) => void;
}

export default function ImageInput({ onFileSelect }: ImageInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>();

  const showFilePicker = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imageFile = event.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      onFileSelect(imageFile);
      setImagePreviewUrl(imageUrl);
    }
  };

  useEffect(() => {
    const refNode = inputRef.current;
    return () => {
      if (refNode) refNode.value = "";
    };
  }, []);

  return (
    <div>
      <div
        className="flex flex-row items-center gap-3 bg-gray-300/10 px-5 py-2 rounded-xl"
        onClick={() => showFilePicker()}
      >
        <Avatar size="lg">
          <AvatarImage src={imagePreviewUrl} />
          <AvatarFallback>ES</AvatarFallback>
        </Avatar>
        <span>Click to Select Image</span>
      </div>
      <Input
        type="file"
        accept="image/*"
        id="imageInput"
        className="hidden"
        ref={inputRef}
        onChange={handleInputChange}
      />
    </div>
  );
}
