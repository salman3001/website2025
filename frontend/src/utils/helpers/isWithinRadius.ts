export interface CordType {
  x: number;
  y: number;
}

export const isWithinRadius = (
  cord1: CordType,
  cord2: CordType,
  maxRadius: number,
) => {
  const toRadiance = (degree: number): number => degree * (Math.PI / 180);
  const { x: lon1, y: lat1 } = cord1;
  const { x: lon2, y: lat2 } = cord2;

  const lat1Rad = toRadiance(lat1);
  const lon1Rad = toRadiance(lon1);
  const lat2Rad = toRadiance(lat2);
  const lon2Rad = toRadiance(lon2);

  const earthRadiusKm = 6371;

  const dLat = lat2Rad - lat1Rad;
  const dLon = lon2Rad - lon1Rad;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sign(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distanceKm = earthRadiusKm * c;
  return distanceKm <= maxRadius;
};
