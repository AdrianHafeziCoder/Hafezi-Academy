import { academyApi } from "./academyApi";

// ===== Classrooms (ClassRoom) =====

export const getClassrooms = (params = {}) =>
  academyApi.getClassroom({ params });

export const getClassroomDetails = (id) =>
  academyApi.getClassroomId({ path: { Id: id } });

// body: { id, classRoomName, capacity, buildingId }
export const createClassroom = (data) => academyApi.postClassroom({ data });

// body: { id, classRoomName, capacity, buildingId }
export const updateClassroom = (data) => academyApi.putClassroom({ data });
