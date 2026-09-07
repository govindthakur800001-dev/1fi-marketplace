/**
 * 1Fi's product is explicitly "no-cost EMI" (0% interest — see 1fi.in FAQ).
 * So the math here is intentionally simple: split price evenly across the
 * tenure, and push any rupee-level rounding remainder into the final
 * installment so the total the user pays always equals the sticker price,
 * to the rupee.
 */
export function buildEmiPlans(price, tenuresMonths) {
  return tenuresMonths.map((months) => {
    const base = Math.floor(price / months);
    const remainder = price - base * months;
    return {
      months,
      monthlyAmount: base,
      lastInstallmentAmount: base + remainder,
      totalPayable: price,
      interestRate: 0,
    };
  });
}

export function getRecommendedPlan(plans) {
  // Default to a mid-length tenure — long enough that the monthly amount
  // feels approachable, short enough that it reads as "committed", which
  // mirrors how 1Fi's own marketing highlights 12-month EMI as the anchor.
  if (!plans.length) return null;
  const preferredOrder = [12, 9, 6, 3, 18, 24];
  for (const months of preferredOrder) {
    const match = plans.find((plan) => plan.months === months);
    if (match) return match;
  }
  return plans[0];
}
