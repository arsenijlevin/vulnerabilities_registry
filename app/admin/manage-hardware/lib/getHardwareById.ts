"use client"

import { SingleHardware } from "@api/hardware/get/route";

export async function getHardwareById(id: number) {
  const res = await fetch(`/api/hardware/get`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    })
  });

  const hardware = await res.json() as SingleHardware;

  return hardware;
}