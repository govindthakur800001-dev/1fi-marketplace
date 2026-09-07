/**
 * This file is the one place that pretends to be a network.
 *
 * The assignment explicitly asks us to avoid hardcoding data into UI
 * components and to structure things so data "can be retrieved
 * dynamically" even without a real backend. So every API function in
 * `productsApi.js` goes through `request()` below instead of importing
 * the JSON directly. Swapping this for a real `fetch("/api/...")` later
 * is a one-file change — no component changes needed.
 */

const SIMULATED_LATENCY_MS = 700;

// Lets us demonstrate error/retry handling on demand without editing code.
// Toggle from the on-screen debug panel (visible only in dev builds).
let forceNextRequestToFail = false;
export function setForceNextRequestToFail(value) {
  forceNextRequestToFail = value;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function request(loader) {
  await delay(SIMULATED_LATENCY_MS);

  if (forceNextRequestToFail) {
    forceNextRequestToFail = false;
    const error = new Error(
      "We couldn't load this right now. Check your connection and try again."
    );
    error.isSimulated = true;
    throw error;
  }

  return loader();
}
