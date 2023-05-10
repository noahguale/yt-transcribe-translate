import React, { ForwardedRef, PropsWithChildren } from "react";
import classNames from "classnames";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

const AccordionDemo = () => (
  <Accordion.Root
    className="bg-slate-100/5 w-5/12 rounded-md shadow-[0_2px_10px] shadow-black/5"
    type="single"
    defaultValue="item-1"
    collapsible
  >
    <AccordionItem value="item-1">
      <AccordionTrigger>How to use:</AccordionTrigger>
      <AccordionContent>
        Enter a YouTube video and update the options to your desired parameters.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-2">
      <AccordionTrigger>How to change Language?</AccordionTrigger>
      <AccordionContent>
        Click on the Options and change to any known language. Less common
        languages will take longer to process.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-3">
      <AccordionTrigger>What are Max Tokens?</AccordionTrigger>
      <AccordionContent>
        The maximum number of tokens that the model is allowed to generate for a
        single output, essentially setting a limit to the length of the
        response.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-4">
      <AccordionTrigger>What is Temperature?</AccordionTrigger>
      <AccordionContent>
        Controls the randomness of the model&apos;s predictions, with higher
        values leading to more diverse and unpredictable outputs, and lower
        values producing more focused and deterministic responses.{" "}
      </AccordionContent>
    </AccordionItem>
  </Accordion.Root>
);

type AccordionItemProps = PropsWithChildren<{
  className?: string;
  value: string;
}>;

const AccordionItem = React.forwardRef(
  (props: AccordionItemProps, forwardedRef: ForwardedRef<any>) => {
    const { children, className, ...rest } = props;
    return (
      <Accordion.Item
        className={classNames(
          "focus-within:shadow-mauve12 mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px]",
          className
        )}
        {...rest}
        ref={forwardedRef}
      >
        {children}
      </Accordion.Item>
    );
  }
);

AccordionItem.displayName = "AccordionItem";

type AccordionTriggerProps = PropsWithChildren<{
  className?: string;
}>;

const AccordionTrigger = React.forwardRef(
  (props: AccordionTriggerProps, forwardedRef: ForwardedRef<any>) => {
    const { children, className, ...rest } = props;
    return (
      <Accordion.Header className="flex">
        <Accordion.Trigger
          className={classNames(
            "text-crimson9 shadow-crimson9 hover:bg-slate-200/5 group flex h-[45px] flex-1 cursor-default items-center justify-between bg-slate-100/5 px-5 text-[15px] leading-none shadow-[0_1px_0] outline-none",
            className
          )}
          {...rest}
          ref={forwardedRef}
        >
          {children}
          <ChevronDownIcon
            className="text-crimson10 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
            aria-hidden
          />
        </Accordion.Trigger>
      </Accordion.Header>
    );
  }
);

AccordionTrigger.displayName = "AccordionTrigger";

type AccordionContentProps = PropsWithChildren<{
  className?: string;
}>;

const AccordionContent = React.forwardRef(
  (props: AccordionContentProps, forwardedRef: ForwardedRef<any>) => {
    const { children, className, ...rest } = props;
    return (
      <Accordion.Content
        className={classNames(
          "text-white bg-slate-100/10 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]",
          className
        )}
        {...rest}
        ref={forwardedRef}
      >
        <div className="py-[15px] px-5">{children}</div>
      </Accordion.Content>
    );
  }
);

AccordionContent.displayName = "AccordionContent";

export default AccordionDemo;
