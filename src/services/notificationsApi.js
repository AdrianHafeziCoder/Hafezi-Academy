import { academyApi } from "./academyApi";

// ===== Notifications (Notifications) =====

// My unseen notifications
export const getMyUnseenNotifications = (params = {}) =>
  academyApi.getV2NotificationAlertMineNoSeen({ params });

// Mark as seen
export const markNotificationSeen = (id) =>
  academyApi.patchV2NotificationAlertSeeId({ path: { id } });

// Send notification to user (body: { message, userId })
export const sendNotification = (data) =>
  academyApi.postV2NotificationAlertAdd({ data });
