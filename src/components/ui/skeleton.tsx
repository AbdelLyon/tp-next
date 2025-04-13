import { mergeTailwindClasses } from "x-react/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={mergeTailwindClasses(
        " bg-skeleton animate-pulse rounded-md",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
