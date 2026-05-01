import { NextResponse } from "next/server"
import { greenhouse } from "@/app/lib/greenhouse"

export async function POST(req: Request) {
  const body = await req.json()

  greenhouse.sensors.temperature = body.temperature
  greenhouse.sensors.humidity = body.humidity
  greenhouse.sensors.light = body.light
  greenhouse.sensors.waterLevel = body.waterLevel

  return NextResponse.json({ success: true })
}