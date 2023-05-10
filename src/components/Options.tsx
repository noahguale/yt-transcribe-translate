import { FC, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { MixerHorizontalIcon, Cross2Icon } from "@radix-ui/react-icons";

interface OptionsProps {
  onOptionsChange: (options: {
    language: string;
    maxTokens: string;
    temperature: string;
  }) => void;
}

const Options: React.FC<OptionsProps> = ({ onOptionsChange }) => {
  const [language, setLanguage] = useState("Japanese");
  const [maxTokens, setMaxTokens] = useState("3000");
  const [temperature, setTemperature] = useState("0");

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    onOptionsChange({ language: newLanguage, maxTokens, temperature });
  };

  const handleMaxTokensChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newMaxTokens = event.target.value;
    setMaxTokens(newMaxTokens);
    onOptionsChange({ language, maxTokens: newMaxTokens, temperature });
  };

  const handleTemperatureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newTemperature = event.target.value;
    setTemperature(newTemperature);
    onOptionsChange({ language, maxTokens, temperature: newTemperature });
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-black bg-white shadow-[0_2px_10px] shadow-blackA7 hover:bg-crimson8 focus:shadow-[0_0_0_2px] focus:shadow-black cursor-default outline-none"
          aria-label="Update dimensions"
        >
          <MixerHorizontalIcon />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="rounded p-5 w-[260px] bg-slate-900/95  data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <div className="flex flex-col gap-2.5">
            <p className="text-crimson9 text-[15px] leading-[19px] font-medium mb-2.5">
              Options
            </p>
            <fieldset className="flex gap-5 items-center">
              <label
                className="text-[13px] text-white w-[75px]"
                htmlFor="width"
              >
                Language
              </label>
              <input
                className="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-white shadow-[0_0_0_1px] shadow-crimson8 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-crimson9 outline-none"
                id="width"
                value={language}
                onChange={handleLanguageChange}
                name="lang"
              />
            </fieldset>
            <fieldset className="flex gap-5 items-center">
              <label
                className="text-[13px] text-white w-[75px]"
                htmlFor="maxWidth"
              >
                Max Toxens
              </label>
              <input
                className="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-white shadow-[0_0_0_1px] shadow-crimson8 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-crimson9 outline-none"
                id="maxWidth"
                value={maxTokens}
                onChange={handleMaxTokensChange}
                name="maxTokens"
              />
            </fieldset>
            <fieldset className="flex gap-5 items-center">
              <label
                className="text-[13px] text-white w-[75px]"
                htmlFor="height"
              >
                Temperature
              </label>
              <input
                className="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-white shadow-[0_0_0_1px] shadow-crimson8 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-crimson9 outline-none"
                id="height"
                value={temperature}
                onChange={handleTemperatureChange}
                name="temperature"
              />
            </fieldset>
          </div>
          <Popover.Close
            className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-white absolute top-[5px] right-[5px] hover:bg-crimson9 focus:shadow-[0_0_0_2px] focus:shadow-crimson9 outline-none cursor-default"
            aria-label="Close"
          >
            <Cross2Icon />
          </Popover.Close>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default Options;
