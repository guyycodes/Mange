export const buildJwtDto = (email, password, existingJwt = null) => {
    const now = new Date();
    const expirationDate = new Date(now.getTime() + 3600000); // 1 hour m/s
  
    if (existingJwt) {
      return { // newly created user
        ...existingJwt,
        password: password,
        isReturningUser: true,
        issuedAt: now.toISOString(),
        expirationDate: expirationDate.toISOString(),
        timeUntilExpiration: 3600, // 1 hour
      };
    } else {
      return { // returning user
        email: email,
        password: password,
        issuedAt: now.toISOString(),
        isReturningUser: false,
        expirationDate: expirationDate.toISOString(),
        timeUntilExpiration: 3600, // 1 hour
        userExists: true,
        valid: false
      };
    }
  };