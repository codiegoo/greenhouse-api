import { NextResponse } from "next/server"
import { greenhouse } from "@/app/lib/greenhouse"

export async function GET() {
  return NextResponse.json(greenhouse)
}