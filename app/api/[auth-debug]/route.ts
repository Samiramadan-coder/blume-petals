import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const logPath = path.join(process.cwd(), "auth-debug.log");

    if (!fs.existsSync(logPath)) {
      return NextResponse.json({
        error: "auth-debug.log not found",
      });
    }

    const content = fs.readFileSync(logPath, "utf8");

    return new NextResponse(content, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return NextResponse.json({
      error: String(error),
    });
  }
}
