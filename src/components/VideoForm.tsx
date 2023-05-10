import React, { useState } from "react";
import * as Form from "@radix-ui/react-form";
import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
// import SelectLanguage from "./SelectLanguage";
import { FC } from "react";
import Options from "./Options";

// type VideoFormProps = {
//   // onSubmit: (videoURL: string) => void,
//   onSubmit: any
//   isProcessing: boolean,
// };

type Options = {
  language: string;
  maxTokens: string;
  temperature: string;
};

type VideoFormProps = {
  onSubmit: (data: { videoUrl: string } & Options) => void;
  isProcessing: boolean;
};

const VideoForm: FC<VideoFormProps> = ({ onSubmit, isProcessing }) => {
  const [options, setOptions] = useState<Options>({
    language: "Japanese",
    maxTokens: "3000",
    temperature: "0",
  });

  const handleOptionsChange = (newOptions: {
    language: string;
    maxTokens: string;
    temperature: string;
  }) => {
    console.log(newOptions); // Add this
    setOptions(newOptions);
  };

  // const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
  //   e.preventDefault();
  //   const videoUrl = (e.target as HTMLFormElement | undefined)?.videoUrl?.value as string;
  //   // onSubmit(videoUrl);
  //   onSubmit({ videoUrl, ...options });

  // };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const videoUrl = (e.target as HTMLFormElement | undefined)?.videoUrl
      ?.value as string;
    console.log({ videoUrl, ...options }); // Add this
    onSubmit({ videoUrl, ...options });
  };

  return (
    <Form.Root onSubmit={handleSubmit} className="w-5/12 ">
      <Form.Field className="grid mb-[10px]" name="URL">
        <div className="flex items-baseline justify-between">
          <Form.Label
            placeholder="test"
            className="text-[15px] font-medium leading-[50px] text-white  w-full"
          >
            YouTube URL
          </Form.Label>
          <Form.Message
            className="text-[13px] text-white opacity-[0.8] w-6/12"
            match="valueMissing"
          >
            Please enter a YouTube URL
          </Form.Message>
          <Form.Message
            className="text-[13px] text-white opacity-[0.8] w-9/12"
            match="typeMismatch"
          >
            Please provide a valid YouTube URL
          </Form.Message>
        </div>
        <div className="flex flex-row gap-2 items-start">
          <Form.Control asChild>
            <input
              className="mb-5 box-border w-full bg-slate-100/5 shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-crimson9"
              name="videoUrl"
              type="text"
              required
              placeholder="https://www.youtube.com/watch?v="
            />
          </Form.Control>
          <Form.Control asChild>
            <Options onOptionsChange={handleOptionsChange} />
          </Form.Control>
        </div>
      </Form.Field>

      <Form.Submit asChild>
        <button
          disabled={isProcessing}
          className="box-border w-full bg-crimson11 text-white shadow-blackA7 hover:bg-crimson9 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]"
        >
          {isProcessing ? "Transcribing..." : "Transcribe"}
        </button>
      </Form.Submit>
    </Form.Root>
  );
};

export default VideoForm;
