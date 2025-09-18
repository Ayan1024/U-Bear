import captainModel from "../models/captainModel.js";

export const createCaptain = async ({ fullname, email, password, vehicle }) => {
  // validate required fields correctly
  if (!fullname?.firstname || !email || !password) {
    throw new Error("All fields are required");
  }

  if (!vehicle?.color || !vehicle?.plate || !vehicle?.capacity || !vehicle?.vehicleType) {
    throw new Error("All vehicle fields are required");
  }

  const captain = await captainModel.create({
    fullname,
    email,
    password,
    vehicle
  });

  return captain;
};
