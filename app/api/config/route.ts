import { NextResponse } from "next/server"
import { greenhouse } from "@/app/lib/greenhouse"

export async function POST(req: Request) {
  const body = await req.json()

  greenhouse.config.targetTemperature = body.targetTemperature
  greenhouse.config.targetHumidity = body.targetHumidity
  greenhouse.config.autoMode = body.autoMode

  return NextResponse.json({ success: true })
}