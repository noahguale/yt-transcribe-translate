type ProgressCallback = (output: string) => void;

async function streamResponse(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  onProgress: ProgressCallback
): Promise<string> {
  return await new Promise((resolve) => {
    const decoder = new TextDecoder();
    let result = "";
    const readChunk = ({
      done,
      value,
    }: ReadableStreamReadResult<Uint8Array>) => {
      if (done) {
        resolve(result);
        return;
      }

      const output = decoder.decode(value);
      result += output;
      onProgress(output);
      reader.read().then(readChunk);
    };

    reader.read().then(readChunk);
  });
}

export async function processVideo(
  videoId: string,
  language: string,
  maxTokens: string,
  temperature: string,
  callback: ProgressCallback
): Promise<false | string> {
  callback("Downloading audio...\n");
  await downloadAudio(videoId, callback);

  callback("\nTranscribing audio. It takes a while...\n");
  const srt = await transcribe(videoId, callback);

  if (srt) {
    callback("\nTranslating text...\n");
    const result = await translate(
      srt,
      language,
      maxTokens,
      temperature,
      callback
    );
    callback("\nDone!\n");
    return result;
  }

  return false;
}

export const getVideoIdFromUrl = (url: string) => {
  const regex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
  const validUrl = regex.test(url);

  if (validUrl) {
    return new URL(url).searchParams.get("v");
  } else {
    throw new Error("stfu");
  }
};

export async function downloadAudio(
  videoId: string,
  onProgress: ProgressCallback
) {
  const res = await fetch(
    `/api/audio?${new URLSearchParams({ video_id: videoId })}`,
    {}
  );
  const reader = res.body?.getReader();

  if (reader) {
    return streamResponse(reader, onProgress);
  } else {
    return false;
  }
}

export async function transcribe(
  videoId: string,
  onProgress: ProgressCallback
): Promise<string | false> {
  const res = await fetch(
    `/api/transcribe?${new URLSearchParams({ video_id: videoId })}`,
    {}
  );
  const reader = res.body?.getReader();

  if (reader) {
    return streamResponse(reader, onProgress);
  } else {
    return false;
  }
}

export async function translate(
  srtData: string,
  language: string,
  maxTokens: string,
  temperature: string,
  onProgress: ProgressCallback
) {
  const requestBody = {
    srtData,
    language,
    maxTokens,
    temperature,
  };

  const res = await fetch(`/api/translate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(requestBody),
  });
  const reader = res.body?.getReader();

  if (reader) {
    const result = await streamResponse(reader, onProgress);
    return result
      .split("\n")
      .filter((line) => {
        return !line.startsWith("[Error]");
      })
      .join("\n");
  } else {
    return false;
  }
}
