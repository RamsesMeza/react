const TIME_UNITS_IN_SECONDS: Record<string, number> = {
  s: 1,
  m: 60,
  h: 60 * 60,
  d: 60 * 60 * 24,
};

export const getJwtExpirationInSeconds = (
  expiresIn: string | number,
): number => {
  if (typeof expiresIn === 'number') {
    if (Number.isFinite(expiresIn)) {
      return Math.max(1, Math.floor(expiresIn));
    }
    return 15 * 60;
  }

  const rawValue = expiresIn.trim();
  const numericValue = Number(rawValue);
  if (Number.isFinite(numericValue)) {
    return Math.max(1, Math.floor(numericValue));
  }

  const match = rawValue.match(/^(\d+)([smhd])$/);
  if (!match) {
    return 15 * 60;
  }

  const amount = Number(match[1]);
  const unit = match[2].toLowerCase();

  return amount * TIME_UNITS_IN_SECONDS[unit];
};
