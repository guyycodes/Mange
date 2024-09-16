export const ComputeClientSideChecksum = async (originalData) => {
    // Convert the original data to JSON if it's not already a string
    const originalDataJson = typeof originalData === 'string' 
      ? originalData 
      : JSON.stringify(originalData);
  
    // Convert the string to an ArrayBuffer
    const encoder = new TextEncoder();
    const data = encoder.encode(originalDataJson);
  
    // Compute checksum using SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
    // Convert the ArrayBuffer to hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
    return hashHex;
  };

//string is exactly 64 hexadecimal characters, ensuring it fits the format of a SHA-256 hash
export const isSHA256 = (str) => {
    return /^[a-f0-9]{64}$/i.test(str);
}