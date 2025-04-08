
// Simple fingerprint generator to identify unique visitors
export const generateFingerprint = (): string => {
  // Collect browser and device information
  const browserData = [
    navigator.userAgent,
    navigator.language,
    screen.colorDepth,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
  ];

  // Convert the data to a string and hash it
  const dataString = browserData.join('|||');
  
  // Simple hashing function (for production, consider using a more robust solution like FingerprintJS)
  let hash = 0;
  for (let i = 0; i < dataString.length; i++) {
    const char = dataString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return Math.abs(hash).toString(16);
};
