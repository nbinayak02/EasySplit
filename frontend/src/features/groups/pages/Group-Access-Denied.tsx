import { LockKeyhole } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function GroupAccessDenied() {
  return (
    <div className="flex min-h-100 items-center justify-center p-6">
      <Card className="w-full max-w-md border-dashed">
        <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <LockKeyhole className="h-7 w-7 text-muted-foreground" />
          </div>

          <div>
            <h2 className="text-xl font-semibold">You can’t view this group</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              You are not a member of this group. Join the group to access its
              content.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
