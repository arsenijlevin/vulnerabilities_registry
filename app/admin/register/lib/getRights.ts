"use client"

import { rights } from "@prisma/client";

export async function getRights() {
  const res = await fetch("/api/rights/getAll");
  const location = await res.json() as rights[];

  return location;
}