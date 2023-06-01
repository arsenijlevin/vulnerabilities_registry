"use client"

import { Hardware } from "@api/hardware/getAll/route";

export async function getHardware() {
  const res = await fetch("/api/hardware/getAll");
  const hardware = await res.json() as Hardware;

  return hardware.map(hardwareItem => {
    return {
      ...hardwareItem,
      hardware_location: hardwareItem.hardware_location.map((location) => location.locations.name).join(", "),
    }
  })
}