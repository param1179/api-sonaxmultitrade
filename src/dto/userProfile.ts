export const adminDto = (res: any) => {
  return {
    _id: res._id,
    firstName: res.firstName,
    lastName: res.lastName,
    email: res.email,
    role: res.role,
    accessToken: ''
  };
};