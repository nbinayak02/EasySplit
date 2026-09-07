import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field";
import { ChevronsUpDown, List } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import type { ExpenseCategory } from "../types/expense.types";
import CategoryActions from "./Expense-Category-Actions-Dropdown";
import CreateExpenseCategory from "./Create-Expense-Category-Dialog";
import useGetExpenseCategoriesByGroup from "../hooks/useGetExpenseCategoriesByGroup";

type Props = {
  groupId: number;
};

export default function ExpenseCategoryCollapsible({ groupId }: Props) {
  const { isPending, data, isError, error } = useGetExpenseCategoriesByGroup({
    groupId,
  });

  if (isError) {
    return (
      <Collapsible className="bg-muted rounded-xl" defaultOpen={false}>
        <CollapsibleTrigger
          className="min-w-full"
          render={
            <Button
              variant={"ghost"}
              className="w-full flex flex-row justify-between"
            >
              <div className="w-full flex flex-row items-center gap-3">
                <List />
                Expense Categories
              </div>
              <ChevronsUpDown />
            </Button>
          }
        />
        <CollapsibleContent>
          <FieldError>{error.message}</FieldError>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Collapsible className="bg-muted rounded-xl">
      <CollapsibleTrigger
        className="min-w-full"
        render={
          <Button
            variant={"ghost"}
            className="w-full flex flex-row justify-between"
          >
            <div className="w-full flex flex-row items-center gap-3">
              <List />
              Expense Categories
            </div>
            <ChevronsUpDown />
          </Button>
        }
      />
      <CollapsibleContent>
        <Separator />

        {isPending ? (
          <div className="p-4 flex flex-col gap3">
            <Skeleton className="w-full h-3" />
            <Skeleton className="w-full h-3" />
            <Skeleton className="w-full h-3" />
          </div>
        ) : (
          <div className="px-4 py-4 flex flex-col gap-3">
            <CreateExpenseCategory groupId={groupId} />

            <h3 className="font-medium text-sm">All Categories</h3>

            
              {data.length === 0 && (
                <p className="text-muted-foreground">No categories found!</p>
              )}
              {data.map((category: ExpenseCategory, index: number) => (
                <div
                  className="py-2 hover:bg-primary hover:text-accent rounded-xl flex flex-row justify-between items-center group"
                  key={category.id}
                >
                  <p>
                    <span className="px-2">{index + 1}.</span>
                    {category.name}
                  </p>
                  <CategoryActions categoryId={category.id} />
                </div>
              ))}
            
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
