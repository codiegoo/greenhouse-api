export type GreenhouseState = {
  sensors: {
    temperature: number
    humidity: number
    light: number
    waterLevel: number
  }
  config: {
    targetTemperature: number
    targetHumidity: number
    autoMode: boolean
  }
  actuators: {
    curtain1: boolean
    curtain2: boolean
    pump: boolean
    fans: boolean
    humidifier: boolean
    led: boolean
  }
}

export const greenhouse: GreenhouseState = {
  sensors: {
    temperature: 0,
    humidity: 0,
    light: 0,
    waterLevel: 0
  },
  config: {
    targetTemperature: 24,
    targetHumidity: 85,
    autoMode: false
  },
  actuators: {
    curtain1: false,
    curtain2: false,
    pump: false,
    fans: false,
    humidifier: false,
    led: false
  }
}
