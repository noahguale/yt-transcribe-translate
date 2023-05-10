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

  cmd.stdout.pipe(response);
}

// export default function POST(
//   request: NextApiRequest,
//   response: NextApiResponse
// ) {
//   const srt = request.body;
//   if (typeof srt !== "string") {
//     response.status(400).json({ error: "Invalid request" });
//     return;
//   }

//   const cmd = spawn(
//     "bash",
//     ["-c", "source myenv/bin/activate && python3 transcription/translate.py"],
//     {
//       cwd: process.cwd(),
//     }
//   );

//   cmd.stdin.write(srt);
//   cmd.stdin.end();
//   transferChildProcessOutput(cmd, response);
// }

export default function POST(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { srtData, language, maxTokens, temperature } = request.body;
  // if (typeof srt !== "string") {
  //   response.status(400).json({ error: "Invalid request" });
  //   return;
  // }

  const cmd = spawn(
    "bash",
    [
      "-c",
      `source myenv/bin/activate && python3 transcription/translate.py ${language} ${maxTokens} ${temperature}`,
    ],
    {
      cwd: process.cwd(),
    }
  );

  cmd.stdin.write(srtData);
  cmd.stdin.end();
  transferChildProcessOutput(cmd, response);
}
