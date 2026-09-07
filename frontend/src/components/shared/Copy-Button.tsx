import { useState } from "react";
import { Button } from "../ui/button";
import { Check, Copy } from "lucide-react";

type CopyButtonProps = {
  textToCopy: string;
};

export default function CopyButton({ textToCopy }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch {
      console.error("Failed to copy!");
    }
  };

  return (
    <Button size={"icon"} onClick={handleCopy}>
      {isCopied ? <Check /> : <Copy />}
    </Button>
  );
}
