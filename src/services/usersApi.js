import { academyApi } from "./academyApi";

export const getUsers = (params = {}) =>
  academyApi.getUserUserMannage({ params });

export const getUserDetails = (userId) =>
  academyApi.getUserUserDetailsUserId({ path: { UserId: userId } });

// Create: firstName, lastName, gmail, password, phoneNumber, isStudent, isTeacher
export const createUser = (data) => academyApi.postUserCreateUser({ data });

// Update: id, fName, lName, userName, gmail, phoneNumber, active, isDelete
export const updateUser = (data) => academyApi.putUserUpdateUser({ data });

export const deleteUser = (userId) =>
  academyApi.deleteUserDeleteUser({ params: { UserId: userId } });

export const reverseUserToActive = (data) =>
  academyApi.putUserReverseToActiveUser({ data });

export const addUserAccess = (data) =>
  academyApi.postUserAddUserAccess({ data });
