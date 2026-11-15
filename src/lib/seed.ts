import { Dream } from "./types";
import { SHARE_PREFIX } from "./config";

export const SEED_DREAMS: Dream[] = [
  {
    id: "seed-1",
    text: "Open a tiny neighborhood café that feels like home.",
    displayName: "Maya",
    anonymous: false,
    status: "live",
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    shareLine: `${SHARE_PREFIX} “Open a tiny neighborhood café that feels like home.”`,
    visualSeed: "a1b2c3d4",
    estimatedCostUsd: 0,
  },
  {
    id: "seed-2",
    text: "Ship a simple tool that helps freelancers get paid on time.",
    displayName: null,
    anonymous: true,
    status: "live",
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    shareLine: `${SHARE_PREFIX} “Ship a simple tool that helps freelancers get paid on time.”`,
    visualSeed: "e5f6a7b8",
    estimatedCostUsd: 0,
  },
  {
    id: "seed-3",
    text: "Build a studio brand before I quit my day job.",
    displayName: "Jordan",
    anonymous: false,
    status: "live",
    createdAt: new Date(Date.now() - 1000 * 60 * 140).toISOString(),
    shareLine: `${SHARE_PREFIX} “Build a studio brand before I quit my day job.”`,
    visualSeed: "c9d0e1f2",
    estimatedCostUsd: 0,
  },
  {
    id: "seed-4",
    text: "Launch a zero-waste refill shop on my block.",
    displayName: null,
    anonymous: true,
    status: "live",
    createdAt: new Date(Date.now() - 1000 * 60 * 200).toISOString(),
    shareLine: `${SHARE_PREFIX} “Launch a zero-waste refill shop on my block.”`,
    visualSeed: "33445566",
    estimatedCostUsd: 0,
  },
];
