import { FC } from "react";
import * as Tabs from "@radix-ui/react-tabs";

export const TabsRoot = (props: any) => (
  <Tabs.Root className="flex flex-col mt-6 min-h-0 w-5/12" {...props} />
);

export const TabsList = (props: any) => (
  <Tabs.List
    className="flex shrink-0 border-b-2 border-slate-100/5 border-solid"
    {...props}
  />
);

export const TabsTrigger = (props: any) => (
  <Tabs.Trigger
    className="bg-slate-100/5 px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-white select-none first:rounded-tl-md last:rounded-tr-md hover:text-crimson9 data-[state=active]:text-crimson9 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-crimson9 outline-none cursor-default"
    // className="flex items-center justify-center h-45 bg-white rounded-tl-lg rounded-tr-lg font-inherit select-none text-foreground text-base leading-none cursor-pointer hover:text-purple-600 focus:text-purple-600 first:rounded-tl-lg last:rounded-tr-lg"
    {...props}
  />
);

export const TabsContent = (props: any) => (
  <Tabs.TabsContent
    className="flex flex-col min-h-0 flex-grow-1 bg-slate-100/5 outline-none"
    {...props}
  />
);
