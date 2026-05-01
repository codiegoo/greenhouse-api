"use client"

import { useEffect, useState } from "react"

export default function Dashboard() {
  const [data, setData] = useState<any>(null)

  const fetchStatus = async () => {
    const res = await fetch("/api/status")
    const json = await res.json()
    setData(json)
  }

  useEffect(() => {
    fetchStatus()
    const interval = setInterval(fetchStatus, 3000)
    return () => clearInterval(interval)
  }, [])

  const updateConfig = async () => {
    await fetch("/api/config", {
      method: "POST",
      body: JSON.stringify({
        targetTemperature: data.config.targetTemperature,
        targetHumidity: data.config.targetHumidity,
        autoMode: data.config.autoMode
      })
    })
  }

  const toggleActuator = async (key: string) => {
    await fetch("/api/control", {
      method: "POST",
      body: JSON.stringify({
        [key]: !data.actuators[key]
      })
    })
    fetchStatus()
  }

  if (!data) return <div className="p-10">Loading...</div>

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-2xl font-bold">Panel Invernadero 🍄</h1>

      {/* Sensores */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-zinc-800 p-4 rounded">
          🌡 Temp: {data.sensors.temperature}°C
        </div>
        <div className="bg-zinc-800 p-4 rounded">
          💧 Hum: {data.sensors.humidity}%
        </div>
        <div className="bg-zinc-800 p-4 rounded">
          💡 Luz: {data.sensors.light}
        </div>
        <div className="bg-zinc-800 p-4 rounded">
          🚰 Agua: {data.sensors.waterLevel}
        </div>
      </div>

      {/* Configuración */}
      <div className="space-y-2">
        <h2 className="font-semibold">Modo Automático</h2>

        <input
          type="number"
          value={data.config.targetTemperature}
          onChange={(e) =>
            setData({
              ...data,
              config: {
                ...data.config,
                targetTemperature: Number(e.target.value)
              }
            })
          }
          className="border p-2"
        />

        <input
          type="number"
          value={data.config.targetHumidity}
          onChange={(e) =>
            setData({
              ...data,
              config: {
                ...data.config,
                targetHumidity: Number(e.target.value)
              }
            })
          }
          className="border p-2"
        />

        <button
          onClick={updateConfig}
          className="bg-green-600 px-4 py-2 rounded"
        >
          Guardar Config
        </button>
      </div>

      {/* Actuadores */}
      <div className="space-y-2">
        <h2 className="font-semibold">Control Manual</h2>

        {Object.keys(data.actuators).map((key) => (
          <button
            key={key}
            onClick={() => toggleActuator(key)}
            className="block bg-blue-600 px-4 py-2 rounded"
          >
            {key}: {data.actuators[key] ? "ON" : "OFF"}
          </button>
        ))}
      </div>
    </div>
  )
}