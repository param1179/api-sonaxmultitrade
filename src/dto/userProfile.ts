export const adminDto = (res: any) => {
  return {
    _id: res._id,
    firstName: res.firstName,
    lastName: res.lastName,
    email: res.email,
    role: res.role,
    accessToken: "",
  };
};

export const userDto = (res: any) => {
  return {
    _id: res._id,
    firstName: res.firstName,
    lastName: res.lastName,
    email: res.email,
    uId: res.uId,
    accessToken: "",
  };
};

export const adminUserDto = (res: any) => {
  return {
    _id: res._id,
    firstName: res.firstName,
    lastName: res.lastName,
    email: res.email,
    mobile: res.mobile,
    dob: res.dob,
    uId: res.uId,
    sponserBY: {} || null,
    nominee: {} || null,
    pin: res.pin,
  };
};
export const userProfileDto = (res: any) => {
  return {
    _id: res._id,
    pId: res.pId,
    firstName: res.firstName,
    lastName: res.lastName,
    email: res.email,
    mobile: res.mobile,
    dob: res.dob,
    uId: res.uId,
    locality: res.locality,
    city: res.city,
    district: res.district,
    state: res.state,
    pin: res.pin,
    sponserBY: {} || null,
    nominee: {} || null,
  };
};
