import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { BanknoteArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import SubmitButton from "@/components/form/Submit-Button";
import useUserContext from "@/contexts/user/useUserContext";
import useCreateSettlement from "../hooks/useCreateSettlement";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import useGetGroupMembers from "@/features/groups/hooks/useGetGroupMembers";

type Props = {
  groupId: number;
};

export default function CreateSettlementDialog({ groupId }: Props) {
  const [open, setOpen] = useState(false);
  const { user } = useUserContext();

  const {
    handleSubmit,
    onFormSubmit,
    serverError,
    isError,
    isPending,
    control,
  } = useCreateSettlement({ groupId, setOpen });

  const { data: members, isPending: isFetchingMembers } = useGetGroupMembers({
    groupId,
  });

  const memberOptions = members
    ? members.map((member) => ({
        value: String(member.user.id),
        label: member.user.first_name.concat(" ", member.user.last_name),
      }))
    : [];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant={"outline"}>
            <BanknoteArrowUp className="size-4" />
            Settle Up
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settle Up</DialogTitle>
          <DialogDescription>
            Enter details and click settle up.
          </DialogDescription>
        </DialogHeader>
        <form className="mt-2 space-y-4" onSubmit={handleSubmit(onFormSubmit)}>
          {isError && <FieldError>{serverError?.message}</FieldError>}

          <Field>
            <FieldLabel>From</FieldLabel>
            <p>{user.name}</p>
          </Field>

          <Controller
            name="paid_to"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Pay to
                  <span className="text-rose-500">*</span>
                </FieldLabel>

                <Select items={memberOptions} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a member." />
                  </SelectTrigger>
                  <SelectContent aria-invalid={fieldState.invalid}>
                    <SelectGroup>
                      <SelectLabel>Group Members</SelectLabel>
                      {memberOptions.length > 0 ? (
                        memberOptions.map((member) => (
                          <SelectItem value={member.value} key={member.value}>
                            {member.label}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectLabel className="text-sm text-center py-2">
                          {isFetchingMembers
                            ? "Loading... "
                            : "No members found!"}
                        </SelectLabel>
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="amount"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Amount
                  <span className="text-rose-500">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Amount"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <DialogFooter>
            <DialogClose render={<Button variant={"outline"} />}>
              Cancel
            </DialogClose>
            <SubmitButton
              isPending={isPending}
              label="Settle Up"
              labelWhenPending="Settling up"
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
