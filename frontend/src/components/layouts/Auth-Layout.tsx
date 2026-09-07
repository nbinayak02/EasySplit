import { Link, Outlet } from "@tanstack/react-router";

export default function AuthLayout() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium text-xl">
            <div className="flex size-10 items-center justify-center text-primary-foreground">
              <img src="/favicon/favicon.svg" alt="logo" />
            </div>
            <div>
              <p>EasySplit</p>
              <p className="text-sm text-muted-foreground">
                Spend. Split. Settle.
              </p>
            </div>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <Outlet />
          </div>
        </div>
      </div>
      {/* right side banner  */}
      <div className="relative hidden bg-primary lg:flex flex-row justify-center items-center">
        <div className="w-full max-w-2xl h-full flex flex-col gap-4 justify-center items-center text-white">
          <div className="w-full px-7 py-2 text-muted/80 dark:text-gray-100/80 flex flex-row justify-between">
            <p>Travel Trip</p>
            <p>Rental</p>
            <p>Hangouts</p>
            <p>and many more.</p>
          </div>
          <p className="text-2xl uppercase font-semibold">
            Split your group expenses easily with
          </p>
          <div>
            <p className="text-5xl font-black">EasySplit</p>
            <p className="text-center py-2">Spend. Split. Settle.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
