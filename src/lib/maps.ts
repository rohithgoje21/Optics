export interface MapLocation {
  address: string
  latitude?: number | null
  longitude?: number | null
}

function locationQuery({ address, latitude, longitude }: MapLocation): string {
  if (latitude != null && longitude != null) return `${latitude},${longitude}`
  return address
}

export function getGoogleMapsEmbedUrl(location: MapLocation): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(locationQuery(location))}&z=17&output=embed`
}

export function getGoogleMapsDirectionsUrl(location: MapLocation): string {
  // Always a named/text search here (not lat,lng) — shows the actual business
  // listing (name, photos, reviews) in Google Maps instead of a bare pin.
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`
}
