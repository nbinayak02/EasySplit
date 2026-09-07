import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

type SubmitButtonProps = {
  isPending: boolean;
  label: string;
  labelWhenPending: string;
};


export default function SubmitButton({
  label,
  labelWhenPending,
  isPending,
}: SubmitButtonProps) {
  return (
    <Button type="submit" className="text-md" disabled={isPending}>
      {isPending ? (
        <div className="flex flex-row justify-center items-center">
          <span>{labelWhenPending}</span>
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <span>{label}</span>
      )}
    </Button>
  );
}
