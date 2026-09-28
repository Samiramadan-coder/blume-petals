// import { handlers } from "@/auth";

// export const { GET, POST } = handlers;

import { handlers } from "@/auth";
import fs from "fs";
import path from "path";
import type { NextRequest } from "next/server";

function writeAuthRouteLog(method: string, response: Response) {
  try {
    fs.appendFileSync(
      path.join(process.cwd(), "auth-debug.log"),
      `\n\n===== ${new Date().toISOString()} | AUTH ${method} RESPONSE =====\n${JSON.stringify(
        {
          status: response.status,
          location: response.headers.get("location"),
          setCookie: response.headers.get("set-cookie"),
        },
        null,
        2,
      )}`,
    );
  } catch (error) {
    console.error("Failed to log auth response:", error);
  }
}

export async function GET(request: NextRequest) {
  const response = await handlers.GET(request);

  writeAuthRouteLog("GET", response);

  return response;
}

export async function POST(request: NextRequest) {
  const response = await handlers.POST(request);

  writeAuthRouteLog("POST", response);

  return response;
}
