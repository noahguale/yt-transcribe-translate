import type { NextApiRequest, NextApiResponse } from "next";
import { spawn } from "child_process";
import path from "path";
import { ChildProcessWithoutNullStreams } from "child_process";

export function transferChildProcessOutput(
  cmd: ChildProcessWithoutNullStreams,
  response: NextApiResponse
) {
  cmd.on("close", (code) => {
    console.log("Finished command. Exit code:", code);
  });
  cmd.stderr.on("data", (chunk) => {
    const chunkStr = chunk.toString("utf-8");
    console.error("[Error]", chunkStr);
    response.write(
      chunkStr
        .split("\n")
        .map((line: string) => "[Error] " + line)
        .join("\n")
    );
  });

  //   response.writeHead(200, {
  //     'Content-Type': 'text/plain',
  //     'Cache-Control': 'no-cache',
  //     'Content-Encoding': 'none'
  //   })

  cmd.stdout.pipe(response);
}

export default function GET(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const video_id = request.query.video_id as string;
  if (typeof video_id !== "string") {
    response.status(400).json({ error: "Invalid request" });
    return;
  }

  console.log("video ID:", video_id);
  const cmd = spawn(path.join(process.cwd(), "transcription/get-audio.sh"), [
    video_id || "",
  ]);
  transferChildProcessOutput(cmd, response);
}
