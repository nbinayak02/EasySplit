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
import { Edit2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useGetSettlement from "../hooks/useGetSettlement";
import SubmitButton from "@/components/form/Submit-Button";
import useUpdateSettlement from "../hooks/useUpdateSettlement";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import useGetGroupMembers from "@/features/groups/hooks/useGetGroupMembers";

type Props = {
  id: number;
  groupId: number;
};

export default function UpdateSettlementDialog({ groupId, id }: Props) {
  const [open, setOpen] = useState(false);
  const {
    data: settlement,
    isPending,
    isError,
    error,
  } = useGetSettlement({
    id,
  });

  const {
    onUpdate,
    handleSubmit,
    control,
    isError: isUpdateError,
    isPending: isUpdatePending,
    serverError,
    reset,
  } = useUpdateSettlement({
    setOpen,
    id,
    groupId,
  });

  const { data: members, isPending: isFetchingMembers } = useGetGroupMembers({
    groupId,
  });

  const memberOptions = members
    ? members.map((member) => ({
        value: String(member.user.id),
        label: member.user.first_name.concat(" ", member.user.last_name),
      }))
    : [];

  useEffect(() => {
    // reset form default value once data arrives
    if (settlement)
      reset({
        id: settlement.id,
        amount: String(settlement.amount),
        paid_to: String(settlement.paid_to.id),
        paid_by: settlement.paid_by.id,
        group: settlement.group,
      });
  }, [settlement, reset]);

  if (isError) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
          </DialogHeader>
          <FieldError>{error.message}</FieldError>
          <DialogFooter>
            <DialogClose render={<Button />}>Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant={"secondary"}>
            <Edit2 /> Update
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Settlement</DialogTitle>
          <DialogDescription>Enter details and click update.</DialogDescription>
        </DialogHeader>
        {isPending ? (
          <Skeleton className="w-full h-30 mt-2" />
        ) : (
          <form className="mt-2 space-y-4" onSubmit={handleSubmit(onUpdate)}>
            {isUpdateError && <FieldError>{serverError?.message}</FieldError>}

            <Controller
              name="paid_to"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Pay to</FieldLabel>

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
                  <FieldLabel htmlFor={field.name}>Amount</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
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
                isPending={isUpdatePending}
                label="Update"
                labelWhenPending="Updating"
              />
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
