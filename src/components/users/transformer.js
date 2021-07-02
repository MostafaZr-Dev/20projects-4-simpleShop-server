exports.getUserData = (user) => {
  return {
    ID: user.userID,
    displayName: `${user.firstName} ${user.lastName}`,
    email: user.email,
    phone: user.phone,
    firstName: user.firstName,
    lastName: user.lastName,
    zipcode: user.zipcode,
    address: user.address,
  };
};
