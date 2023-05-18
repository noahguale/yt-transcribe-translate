import { FC, useState } from "react";
import VideoForm from "./VideoForm";
import Results from "./Results";
import { TabsContent, TabsRoot, TabsList, TabsTrigger } from "./Tabs";
import { getVideoIdFromUrl, processVideo } from "utils/api";
import AccordionDemo from "./Info";

interface LayoutProps {}

const Layout: FC<LayoutProps> = ({}) => {
  const [isProcessing, setProcessing] = useState(false);
  const [progressOutput, setProgressOutput] = useState("");
  const [activeTab, setActiveTab] = useState("progress");
  const [resultTranscript, setResultTranscript] = useState("");

  const handleStartProcessing = async (data: {
    videoUrl: string;
    language: string;
    maxTokens: string;
    temperature: string;
  }) => {
    const { videoUrl, language, maxTokens, temperature } = data;
    const videoId = getVideoIdFromUrl(videoUrl);
    console.log("videoId:", videoId);

    if (typeof videoId === "string") {
      setResultTranscript("");
      setProcessing(true);

      const transcript = await processVideo(
        videoId,
        language,
        maxTokens,
        temperature,
        (message) => {
          setProgressOutput((prev) => prev + message);
        }
      );
      if (transcript) {
        setResultTranscript(transcript);
      }

      setProcessing(false);
      setActiveTab("result");
    } else {
      alert("Invalid URL");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="text-[50px] text-center mb-10">
          YouTube Transcriber/Translator
        </div>
        <VideoForm
          onSubmit={handleStartProcessing}
          isProcessing={isProcessing}
        ></VideoForm>
        <div className="mt-4"></div>
        <TabsRoot value={activeTab} onValueChange={setActiveTab}>
          <TabsList aria-label="Output">
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="result">Result</TabsTrigger>
          </TabsList>
          <TabsContent value="progress">
            <Results>{progressOutput}</Results>
          </TabsContent>
          <TabsContent value="result">
            <Results>{resultTranscript}</Results>
          </TabsContent>
        </TabsRoot>
        <div className="mt-10"></div>
        <AccordionDemo />
      </div>
    </>
  );
};

export default Layout;
