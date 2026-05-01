import { NextResponse } from "next/server"
import { greenhouse } from "@/app/lib/greenhouse"

export async function POST(req: Request) {
  const body = await req.json()

  greenhouse.actuators = {
    ...greenhouse.actuators,
    ...body
  }

  return NextResponse.json({ success: true })
}