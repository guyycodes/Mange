export const makeAddress = (address) => {
        // Unscramble
        let unscrambled = "";
        for (let i = 0; i < address.length; i++) {
            let charCode = address.charCodeAt(i);
            if (i % 2 === 0) {
                // Right shift for even indices (reverse of left shift)
                charCode = ((charCode - 32 - 5 + 95) % 95 + 32);
            } else {
                // Left shift for odd indices (reverse of right shift)
                charCode = ((charCode - 32 + 3) % 95 + 32);
            }
            unscrambled += String.fromCharCode(charCode);
        }
        return unscrambled;
}