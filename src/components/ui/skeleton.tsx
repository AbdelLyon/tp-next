import { mergeTailwindClasses } from "x-react/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={mergeTailwindClasses(
        "bg-content2 dark:bg-conic-240 animate-pulse rounded-md",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
