export const typography = {
  headings: {
    h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
    h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
    h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
    h4: "scroll-m-20 text-xl font-semibold tracking-tight",
    h5: "scroll-m-20 text-lg font-semibold tracking-tight",
    h6: "scroll-m-20 text-base font-semibold tracking-tight",
  },
  text: {
    lead: "text-xl text-muted-foreground",
    large: "text-lg font-semibold",
    small: "text-sm font-medium leading-none",
    muted: "text-sm text-muted-foreground",
    code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
  },
  prose: {
    base: "leading-7 [&:not(:first-child)]:mt-6",
    p: "leading-7 [&:not(:first-child)]:mt-6",
    blockquote: "mt-6 border-l-2 pl-6 italic",
    list: "my-6 ml-6 list-disc [&>li]:mt-2",
    table: "w-full border-collapse border border-border",
  },
} as const;

export const textUtils = {
  truncate: "truncate",
  ellipsis: "text-ellipsis overflow-hidden",
  wrap: "break-words",
  nowrap: "whitespace-nowrap",
  center: "text-center",
  left: "text-left",
  right: "text-right",
  justify: "text-justify",
} as const;
