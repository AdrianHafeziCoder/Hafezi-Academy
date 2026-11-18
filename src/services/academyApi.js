// Generated from the Sepehr Academy OpenAPI/Postman export supplied with the project.
// The source document omits response schemas and several request-body schemas.
// For that reason each endpoint accepts a generic { path, params, data, config } argument.
import http from "./http";

export const academyEndpoints = [
  { name: "getTermId", method: "GET", path: "/Term/{Id}" },
  {
    name: "postTermAddTermCloseDate",
    method: "POST",
    path: "/Term/AddTermCloseDate",
  },
  {
    name: "putTermUpdateTermCloseDate",
    method: "PUT",
    path: "/Term/UpdateTermCloseDate",
  },
  { name: "getTerm", method: "GET", path: "/Term" },
  { name: "putTerm", method: "PUT", path: "/Term" },
  { name: "postTerm", method: "POST", path: "/Term" },
  {
    name: "getSharepanelChangeRecoverySendValue",
    method: "GET",
    path: "/SharePanel/ChangeRecovery/{SendValue}",
  },
  {
    name: "getSharepanelGetMyJobHistories",
    method: "GET",
    path: "/SharePanel/GetMyJobHistories",
  },
  {
    name: "getSharepanelGetJobHistory",
    method: "GET",
    path: "/SharePanel/GetJobHistory",
  },
  {
    name: "postSharepanelCreateJobHistory",
    method: "POST",
    path: "/SharePanel/CreateJobHistory",
  },
  {
    name: "postSharepanelUpdateJobHistory",
    method: "POST",
    path: "/SharePanel/UpdateJobHistory",
  },
  {
    name: "deleteSharepanelDeleteJobHistory",
    method: "DELETE",
    path: "/SharePanel/DeleteJobHistory",
  },
  {
    name: "getSharepanelGetJobHistoriesAdmin",
    method: "GET",
    path: "/SharePanel/GetJobHistoriesAdmin",
  },
  {
    name: "postSharepanelHistoryToIndex",
    method: "POST",
    path: "/SharePanel/HistoryToIndex",
  },
  {
    name: "getSharepanelGetProfileInfo",
    method: "GET",
    path: "/SharePanel/GetProfileInfo",
  },
  {
    name: "putSharepanelUpdateProfileInfo",
    method: "PUT",
    path: "/SharePanel/UpdateProfileInfo",
  },
  {
    name: "postSharepanelAddProfileImage",
    method: "POST",
    path: "/SharePanel/AddProfileImage",
  },
  {
    name: "postSharepanelSelectProfileImage",
    method: "POST",
    path: "/SharePanel/SelectProfileImage",
  },
  {
    name: "deleteSharepanelDeleteProfileImage",
    method: "DELETE",
    path: "/SharePanel/DeleteProfileImage",
  },
  {
    name: "postSharepanelChangePassword",
    method: "POST",
    path: "/SharePanel/ChangePassword",
  },
  {
    name: "getSharepanelGetMyCourses",
    method: "GET",
    path: "/SharePanel/GetMyCourses",
  },
  {
    name: "getSharepanelGetMyFavoriteCourses",
    method: "GET",
    path: "/SharePanel/GetMyFavoriteCourses",
  },
  {
    name: "getSharepanelGetMyFavoriteNews",
    method: "GET",
    path: "/SharePanel/GetMyFavoriteNews",
  },
  {
    name: "getSharepanelGetMyCoursesReserve",
    method: "GET",
    path: "/SharePanel/GetMyCoursesReserve",
  },
  {
    name: "getSharepanelGetSecurityInfo",
    method: "GET",
    path: "/SharePanel/GetSecurityInfo",
  },
  {
    name: "putSharepanelEditSecurity",
    method: "PUT",
    path: "/SharePanel/EditSecurity",
  },
  {
    name: "getSharepanelGetMyCoursesComments",
    method: "GET",
    path: "/SharePanel/GetMyCoursesComments",
  },
  {
    name: "getSharepanelGetMyNewsComments",
    method: "GET",
    path: "/SharePanel/GetMyNewsComments",
  },
  { name: "getAssistanceworkId", method: "GET", path: "/AssistanceWork/{Id}" },
  { name: "getAssistancework", method: "GET", path: "/AssistanceWork" },
  { name: "putAssistancework", method: "PUT", path: "/AssistanceWork" },
  { name: "postAssistancework", method: "POST", path: "/AssistanceWork" },
  {
    name: "getCourseassistanceId",
    method: "GET",
    path: "/CourseAssistance/{Id}",
  },
  { name: "getCourseassistance", method: "GET", path: "/CourseAssistance" },
  { name: "putCourseassistance", method: "PUT", path: "/CourseAssistance" },
  { name: "postCourseassistance", method: "POST", path: "/CourseAssistance" },
  {
    name: "postSignLoginTelegramCodePhoneOrGmail",
    method: "POST",
    path: "/Sign/LoginTelegram/{code}/{phoneOrGmail}",
  },
  { name: "postSignLogin", method: "POST", path: "/Sign/Login" },
  {
    name: "postSignSendVerifyMessage",
    method: "POST",
    path: "/Sign/SendVerifyMessage",
  },
  {
    name: "postSignVerifyMessage",
    method: "POST",
    path: "/Sign/VerifyMessage",
  },
  { name: "postSignRegister", method: "POST", path: "/Sign/Register" },
  {
    name: "postSignForgetPassword",
    method: "POST",
    path: "/Sign/ForgetPassword",
  },
  { name: "postSignReset", method: "POST", path: "/Sign/Reset" },
  { name: "postAddcoursedisslike", method: "POST", path: "/AddCourseDissLike" },
  {
    name: "getCoursesocialgroupId",
    method: "GET",
    path: "/CourseSocialGroup/{Id}",
  },
  { name: "getCoursesocialgroup", method: "GET", path: "/CourseSocialGroup" },
  { name: "postCoursesocialgroup", method: "POST", path: "/CourseSocialGroup" },
  {
    name: "getCourseuserGetCourseUserList",
    method: "GET",
    path: "/CourseUser/GetCourseUserList",
  },
  { name: "postCourselevel", method: "POST", path: "/CourseLevel" },
  {
    name: "getCourseuserGetListMyCourseUser",
    method: "GET",
    path: "/CourseUser/GetListMyCourseUser",
  },
  {
    name: "getCourseuserGetCourseUserId",
    method: "GET",
    path: "/CourseUser/GetCourseUserId",
  },
  {
    name: "getCourseuserGetCourseUserIdAdmin",
    method: "GET",
    path: "/CourseUser/GetCourseUserIdAdmin",
  },
  { name: "getCourseId", method: "GET", path: "/Course/{id}" },
  {
    name: "getCourseTeacherCourseList",
    method: "GET",
    path: "/Course/TeacherCourseList",
  },
  { name: "postCourse", method: "POST", path: "/Course" },
  { name: "putCourse", method: "PUT", path: "/Course" },
  {
    name: "postCourseSetNewImageForCourse",
    method: "POST",
    path: "/Course/SetNewImageForCourse",
  },
  {
    name: "postCourseSetNewImageUrlForCourse",
    method: "POST",
    path: "/Course/SetNewImageUrlForCourse",
  },
  {
    name: "postCourseAddCourseTechnology",
    method: "POST",
    path: "/Course/AddCourseTechnology",
  },
  {
    name: "postCourseAddCourseDissLike",
    method: "POST",
    path: "/Course/AddCourseDissLike",
  },
  {
    name: "postCourseAddCourseLike",
    method: "POST",
    path: "/Course/AddCourseLike",
  },
  {
    name: "postCourseAddCourseFavorite",
    method: "POST",
    path: "/Course/AddCourseFavorite",
  },
  {
    name: "postCourseSetCourseRating",
    method: "POST",
    path: "/Course/SetCourseRating",
  },
  {
    name: "putCourseActiveAndDeactiveCourse",
    method: "PUT",
    path: "/Course/ActiveAndDeactiveCourse",
  },
  {
    name: "deleteCourseDeleteCourseLike",
    method: "DELETE",
    path: "/Course/DeleteCourseLike",
  },
  {
    name: "deleteCourseDeleteCourseFavorite",
    method: "DELETE",
    path: "/Course/DeleteCourseFavorite",
  },
  {
    name: "deleteCourseDeleteCourse",
    method: "DELETE",
    path: "/Course/DeleteCourse",
  },
  {
    name: "putCourseUpdateCourseStatus",
    method: "PUT",
    path: "/Course/UpdateCourseStatus",
  },
  {
    name: "putCourseSetExpireCourse",
    method: "PUT",
    path: "/Course/SetExpireCourse",
  },
  {
    name: "getCourseCommentManagment",
    method: "GET",
    path: "/Course/CommentManagment",
  },
  {
    name: "getCourseCommentManagmentTeacher",
    method: "GET",
    path: "/Course/CommentManagmentTeacher",
  },
  {
    name: "getCourseGetCourseCommnetsCourseId",
    method: "GET",
    path: "/Course/GetCourseCommnets/{CourseId}",
  },
  {
    name: "getCourseGetCourseReplyCommnetsCourseIdCommentId",
    method: "GET",
    path: "/Course/GetCourseReplyCommnets/{CourseId}/{CommentId}",
  },
  {
    name: "postCourseAcceptCourseComment",
    method: "POST",
    path: "/Course/AcceptCourseComment",
  },
  {
    name: "postCourseAddCommentCourse",
    method: "POST",
    path: "/Course/AddCommentCourse",
  },
  {
    name: "putCourseUpdateCourseComment",
    method: "PUT",
    path: "/Course/UpdateCourseComment",
  },
  {
    name: "postCourseAddCourseCommentLike",
    method: "POST",
    path: "/Course/AddCourseCommentLike",
  },
  {
    name: "postCourseAddCourseCommentDissLike",
    method: "POST",
    path: "/Course/AddCourseCommentDissLike",
  },
  {
    name: "postCourseAddReplyCourseComment",
    method: "POST",
    path: "/Course/AddReplyCourseComment",
  },
  {
    name: "deleteCourseDeleteCourseCommentLike",
    method: "DELETE",
    path: "/Course/DeleteCourseCommentLike",
  },
  { name: "getCourseGetCreate", method: "GET", path: "/Course/GetCreate" },
  {
    name: "postCoursereserveSendReserveToCourse",
    method: "POST",
    path: "/CourseReserve/SendReserveToCourse",
  },
  {
    name: "postCoursereserveReserveAdd",
    method: "POST",
    path: "/CourseReserve/ReserveAdd",
  },
  {
    name: "getCoursereserveCourseId",
    method: "GET",
    path: "/CourseReserve/{CourseId}",
  },
  { name: "getCoursereserve", method: "GET", path: "/CourseReserve" },
  { name: "deleteCoursereserve", method: "DELETE", path: "/CourseReserve" },
  { name: "getCourseCourseList", method: "GET", path: "/Course/CourseList" },
  {
    name: "getCoursegroupGetCourseGroup",
    method: "GET",
    path: "/CourseGroup/GetCourseGroup",
  },
  {
    name: "getCoursegroupDetails",
    method: "GET",
    path: "/CourseGroup/Details",
  },
  { name: "getCoursegroup", method: "GET", path: "/CourseGroup" },
  { name: "postCoursegroup", method: "POST", path: "/CourseGroup" },
  { name: "deleteCoursegroup", method: "DELETE", path: "/CourseGroup" },
  { name: "putCoursegroup", method: "PUT", path: "/CourseGroup" },
  {
    name: "getCoursetypeGetCourseTypes",
    method: "GET",
    path: "/CourseType/GetCourseTypes",
  },
  {
    name: "getCourselevelGetAllCourseLevel",
    method: "GET",
    path: "/CourseLevel/GetAllCourseLevel",
  },
  {
    name: "postV2ErrorHandelingCreateError",
    method: "POST",
    path: "/v2/errorHandeling/createError",
  },
  { name: "getHomeGetTeachers", method: "GET", path: "/Home/GetTeachers" },
  {
    name: "getHomeGetTeacherDetails",
    method: "GET",
    path: "/Home/GetTeacherDetails",
  },
  { name: "getHomeLandingReport", method: "GET", path: "/Home/LandingReport" },
  {
    name: "getHomeGetCourseDetails",
    method: "GET",
    path: "/Home/GetCourseDetails",
  },
  {
    name: "getHomeGetCoursesWithPagination",
    method: "GET",
    path: "/Home/GetCoursesWithPagination",
  },
  { name: "getHomeGetCoursesTop", method: "GET", path: "/Home/GetCoursesTop" },
  {
    name: "getHomeGetTechnologies",
    method: "GET",
    path: "/Home/GetTechnologies",
  },
  { name: "getBuildingId", method: "GET", path: "/Building/{Id}" },
  { name: "putBuildingActive", method: "PUT", path: "/Building/Active" },
  { name: "getBuilding", method: "GET", path: "/Building" },
  { name: "putBuilding", method: "PUT", path: "/Building" },
  { name: "postBuilding", method: "POST", path: "/Building" },
  { name: "getClassroomId", method: "GET", path: "/ClassRoom/{Id}" },
  { name: "getClassroom", method: "GET", path: "/ClassRoom" },
  { name: "putClassroom", method: "PUT", path: "/ClassRoom" },
  { name: "postClassroom", method: "POST", path: "/ClassRoom" },
  {
    name: "patchMessageSeenMessageId",
    method: "PATCH",
    path: "/message/seen/{messageId}",
  },
  {
    name: "postV2MultiAccountAddAccount",
    method: "POST",
    path: "/v2/multiAccount/addAccount",
  },
  {
    name: "getV2MultiAccountMyAccounts",
    method: "GET",
    path: "/v2/multiAccount/myAccounts",
  },
  {
    name: "patchV2MultiAccountRemoveAccountId",
    method: "PATCH",
    path: "/v2/multiAccount/removeAccount/{id}",
  },
  {
    name: "patchV2MultiAccountActiveAccountId",
    method: "PATCH",
    path: "/v2/multiAccount/activeAccount/{id}",
  },
  {
    name: "postNewsCreateNewsFile",
    method: "POST",
    path: "/News/CreateNewsFile",
  },
  {
    name: "putNewsUpdateNewsFile",
    method: "PUT",
    path: "/News/UpdateNewsFile",
  },
  {
    name: "deleteNewsDeleteNewsFile",
    method: "DELETE",
    path: "/News/DeleteNewsFile",
  },
  {
    name: "putNewsUpdateNewsCategory",
    method: "PUT",
    path: "/News/UpdateNewsCategory",
  },
  {
    name: "putNewsUpdateNewsComment",
    method: "PUT",
    path: "/News/UpdateNewsComment",
  },
  { name: "getNews", method: "GET", path: "/News" },
  { name: "getNewsId", method: "GET", path: "/News/{Id}" },
  {
    name: "getNewsGetRepliesComments",
    method: "GET",
    path: "/News/GetRepliesComments",
  },
  {
    name: "getNewsGetNewsComments",
    method: "GET",
    path: "/News/GetNewsComments",
  },
  {
    name: "getNewsGetNewsCategoryId",
    method: "GET",
    path: "/News/GetNewsCategory/{Id}",
  },
  {
    name: "getNewsGetNewsWithCategoryId",
    method: "GET",
    path: "/News/GetNewsWithCategory/{Id}",
  },
  {
    name: "getNewsGetListNewsCategory",
    method: "GET",
    path: "/News/GetListNewsCategory",
  },
  {
    name: "postNewsCommentLikeCommentId",
    method: "POST",
    path: "/News/CommentLike/{CommentId}",
  },
  {
    name: "postNewsNewsLikeNewsId",
    method: "POST",
    path: "/News/NewsLike/{NewsId}",
  },
  {
    name: "postNewsNewsDissLikeNewsId",
    method: "POST",
    path: "/News/NewsDissLike/{NewsId}",
  },
  { name: "postNewsNewsRate", method: "POST", path: "/News/NewsRate" },
  {
    name: "postNewsCreateNewsComment",
    method: "POST",
    path: "/News/CreateNewsComment",
  },
  {
    name: "postNewsCreateNewsReplyComment",
    method: "POST",
    path: "/News/CreateNewsReplyComment",
  },
  {
    name: "postNewsAddFavoriteNews",
    method: "POST",
    path: "/News/AddFavoriteNews",
  },
  {
    name: "deleteNewsDeleteFavoriteNews",
    method: "DELETE",
    path: "/News/DeleteFavoriteNews",
  },
  {
    name: "deleteNewsDeleteLikeNews",
    method: "DELETE",
    path: "/News/DeleteLikeNews",
  },
  {
    name: "deleteNewsDeleteCommentLikeNews",
    method: "DELETE",
    path: "/News/DeleteCommentLikeNews",
  },
  {
    name: "getNewsAdminNewsFilterList",
    method: "GET",
    path: "/News/AdminNewsFilterList",
  },
  {
    name: "getNewsGetAdminRepliesComments",
    method: "GET",
    path: "/News/GetAdminRepliesComments",
  },
  { name: "getNewsGetNewsFile", method: "GET", path: "/News/GetNewsFile" },
  {
    name: "getNewsGetNewsFileList",
    method: "GET",
    path: "/News/GetNewsFileList",
  },
  {
    name: "getNewsGetAdminNewsComments",
    method: "GET",
    path: "/News/GetAdminNewsComments",
  },
  {
    name: "postNewsCreateNewsCategory",
    method: "POST",
    path: "/News/CreateNewsCategory",
  },
  {
    name: "postNewsSetUrlForNews",
    method: "POST",
    path: "/News/SetUrlForNews",
  },
  { name: "postNewsCreateNews", method: "POST", path: "/News/CreateNews" },
  { name: "putNewsUpdateNews", method: "PUT", path: "/News/UpdateNews" },
  {
    name: "putNewsActiveDeactiveNews",
    method: "PUT",
    path: "/News/ActiveDeactiveNews",
  },
  {
    name: "getV2NotificationAlertMineNoSeen",
    method: "GET",
    path: "/v2/notification/alert/mineNoSeen",
  },
  {
    name: "patchV2NotificationAlertSeeId",
    method: "PATCH",
    path: "/v2/notification/alert/see/{id}",
  },
  {
    name: "postV2NotificationAlertAdd",
    method: "POST",
    path: "/v2/notification/alert/add",
  },
  { name: "getDepartmentId", method: "GET", path: "/Department/{Id}" },
  { name: "getDepartment", method: "GET", path: "/Department" },
  { name: "putDepartment", method: "PUT", path: "/Department" },
  { name: "postDepartment", method: "POST", path: "/Department" },
  {
    name: "getCoursepaymentUserPayList",
    method: "GET",
    path: "/CoursePayment/UserPayList",
  },
  {
    name: "getCoursepaymentStudentUserPayList",
    method: "GET",
    path: "/CoursePayment/StudentUserPayList",
  },
  {
    name: "getCoursepaymentListOfWhoIsPay",
    method: "GET",
    path: "/CoursePayment/ListOfWhoIsPay",
  },
  { name: "getCoursepaymentId", method: "GET", path: "/CoursePayment/{Id}" },
  { name: "getCoursepayment", method: "GET", path: "/CoursePayment" },
  {
    name: "getReportDashboardReport",
    method: "GET",
    path: "/Report/DashboardReport",
  },
  {
    name: "getReportDashboardTechnologyReport",
    method: "GET",
    path: "/Report/DashboardTechnologyReport",
  },
  {
    name: "getSchedualGetStudentSchedualsSchedualId",
    method: "GET",
    path: "/Schedual/GetStudentScheduals/{SchedualId}",
  },
  {
    name: "getSchedualGetStudentScheduals",
    method: "GET",
    path: "/Schedual/GetStudentScheduals",
  },
  {
    name: "putSchedualLockToRiase",
    method: "PUT",
    path: "/Schedual/LockToRiase",
  },
  {
    name: "postSchedualAddSchedualSingle",
    method: "POST",
    path: "/Schedual/AddSchedualSingle",
  },
  {
    name: "getSchedualGetAdminScheduals",
    method: "GET",
    path: "/Schedual/GetAdminScheduals",
  },
  {
    name: "getSchedualGetTeacherScheduals",
    method: "GET",
    path: "/Schedual/GetTeacherScheduals",
  },
  {
    name: "postSessionAddCourseUserHomeWork",
    method: "POST",
    path: "/Session/AddCourseUserHomeWork",
  },
  {
    name: "postSessionAddExerciseFile",
    method: "POST",
    path: "/Session/AddExerciseFile",
  },
  {
    name: "postSessionAddSessionHomeWork",
    method: "POST",
    path: "/Session/AddSessionHomeWork",
  },
  {
    name: "postSessionAddSessionFile",
    method: "POST",
    path: "/Session/AddSessionFile",
  },
  {
    name: "postSessionAddSessionFileWithUrl",
    method: "POST",
    path: "/Session/AddSessionFileWithUrl",
  },
  { name: "postSessionStudentAP", method: "POST", path: "/Session/Student_AP" },
  {
    name: "deleteSessionDeleteExserciseFile",
    method: "DELETE",
    path: "/Session/DeleteExserciseFile",
  },
  {
    name: "deleteSessionDeleteSessionFile",
    method: "DELETE",
    path: "/Session/DeleteSessionFile",
  },
  {
    name: "getSessionGetSessionHomeWork",
    method: "GET",
    path: "/Session/GetSessionHomeWork",
  },
  {
    name: "getSessionStudentHomeworkList",
    method: "GET",
    path: "/Session/StudentHomeworkList",
  },
  {
    name: "getSessionSessionDetail",
    method: "GET",
    path: "/Session/SessionDetail",
  },
  { name: "getSitesettingId", method: "GET", path: "/SiteSetting/{Id}" },
  { name: "getLogRequest", method: "GET", path: "/log/request" },
  {
    name: "patchNewversionCoursePaymentStepOneToPayReserveId",
    method: "PATCH",
    path: "/NewVersion/CoursePayment/StepOneToPay/{reserveId}",
  },
  {
    name: "patchNewversionCoursePaymentStepTwoToPayReserveId",
    method: "PATCH",
    path: "/NewVersion/CoursePayment/StepTwoToPay/{reserveId}",
  },
  { name: "getStatus", method: "GET", path: "/Status" },
  { name: "putStatus", method: "PUT", path: "/Status" },
  { name: "postStatus", method: "POST", path: "/Status" },
  { name: "getTechnology", method: "GET", path: "/Technology" },
  { name: "putTechnology", method: "PUT", path: "/Technology" },
  { name: "postTechnology", method: "POST", path: "/Technology" },
  {
    name: "postTicketExistTicketAddOverview",
    method: "POST",
    path: "/ticket/ExistTicket/addOverview",
  },
  {
    name: "postTicketMessageSendUser",
    method: "POST",
    path: "/ticket/message/sendUser",
  },
  {
    name: "postTicketMessageSendSupport",
    method: "POST",
    path: "/ticket/message/sendSupport",
  },
  {
    name: "getTicketMessageChatDetailUserId",
    method: "GET",
    path: "/ticket/message/chatDetailUser/{id}",
  },
  {
    name: "getTicketAutoCompleteText",
    method: "GET",
    path: "/ticket/autoComplete/{text}",
  },
  {
    name: "postTicketCreateTicket",
    method: "POST",
    path: "/ticket/createTicket",
  },
  { name: "getTicketAllTickets", method: "GET", path: "/ticket/AllTickets" },
  {
    name: "getTicketAllTicketsNotAccepted",
    method: "GET",
    path: "/ticket/AllTicketsNotAccepted",
  },
  {
    name: "getTicketAllTicketsMine",
    method: "GET",
    path: "/ticket/AllTicketsMine",
  },
  {
    name: "getTicketAllTicketsMineUser",
    method: "GET",
    path: "/ticket/AllTicketsMineUser",
  },
  {
    name: "patchTicketAcceptTicketTicketId",
    method: "PATCH",
    path: "/ticket/acceptTicket/{ticketId}",
  },
  {
    name: "patchTicketCheckExistTicket",
    method: "PATCH",
    path: "/ticket/checkExistTicket",
  },
  {
    name: "getV2TournamentUserMentor",
    method: "GET",
    path: "/v2/tournament/user/mentor",
  },
  {
    name: "postV2TournamentUserCreateTeam",
    method: "POST",
    path: "/v2/tournament/user/createTeam",
  },
  {
    name: "postV2TournamentUserCreateTeamWithTeammate",
    method: "POST",
    path: "/v2/tournament/user/createTeamWithTeammate",
  },
  {
    name: "postV2TournamentUserAddTeammates",
    method: "POST",
    path: "/v2/tournament/user/addTeammates",
  },
  {
    name: "getV2TournamentUserTournament",
    method: "GET",
    path: "/v2/tournament/user/Tournament",
  },
  {
    name: "getV2TournamentUserTournamentRNgEmdGGfqOIRKGC5nSQ0",
    method: "GET",
    path: "/v2/tournament/user/Tournament/RNgEmdGGfqOIRKGC5nSQ0",
  },
  {
    name: "postV2TournamentAdminCreateMentor",
    method: "POST",
    path: "/v2/tournament/admin/createMentor",
  },
  {
    name: "getV2TournamentAdminMentor",
    method: "GET",
    path: "/v2/tournament/admin/mentor",
  },
  {
    name: "postV2TournamentAdminScoreCriterionCreate",
    method: "POST",
    path: "/v2/tournament/admin/scoreCriterion/create",
  },
  {
    name: "putV2TournamentAdminScoreCriterionUpdate",
    method: "PUT",
    path: "/v2/tournament/admin/scoreCriterion/update",
  },
  {
    name: "getV2TournamentAdminScoreCriterionAllTournamentId",
    method: "GET",
    path: "/v2/tournament/admin/scoreCriterion/all/{tournamentId}",
  },
  {
    name: "deleteV2TournamentAdminScoreCriterionDelId",
    method: "DELETE",
    path: "/v2/tournament/admin/scoreCriterion/del/{id}",
  },
  {
    name: "postV2TournamentAdminCreateTournament",
    method: "POST",
    path: "/v2/tournament/admin/createTournament",
  },
  {
    name: "patchV2TournamentAdminStatusTournament",
    method: "PATCH",
    path: "/v2/tournament/admin/statusTournament",
  },
  {
    name: "getV2TournamentAdminTournamentFullId",
    method: "GET",
    path: "/v2/tournament/admin/TournamentFull/{id}",
  },
  {
    name: "getV2TournamentAdminTournament",
    method: "GET",
    path: "/v2/tournament/admin/Tournament",
  },
  {
    name: "getV2TournamentRefereeScoreFieldsTournamentId",
    method: "GET",
    path: "/v2/tournament/referee/ScoreFields/{TournamentId}",
  },
  {
    name: "getV2TournamentRefereeMyScoreTournamentId",
    method: "GET",
    path: "/v2/tournament/referee/myScore/{TournamentId}",
  },
  {
    name: "getV2TournamentRefereeScoreDetailTeamId",
    method: "GET",
    path: "/v2/tournament/referee/ScoreDetail/{teamId}",
  },
  {
    name: "deleteV2TournamentRefereeScoreScoreId",
    method: "DELETE",
    path: "/v2/tournament/referee/score/{ScoreId}",
  },
  {
    name: "putV2TournamentRefereeUpdateScoreId",
    method: "PUT",
    path: "/v2/tournament/referee/updateScore/{id}",
  },
  {
    name: "postV2TournamentRefereeAddScore",
    method: "POST",
    path: "/v2/tournament/referee/addScore",
  },
  {
    name: "getV2TournamentAdminFullScoreTournamentId",
    method: "GET",
    path: "/v2/tournament/admin/fullScore/{TournamentId}",
  },
  {
    name: "getV2TournamentAdminScoreDetailTeamIdRefreeId",
    method: "GET",
    path: "/v2/tournament/admin/ScoreDetail/{teamId}/{refreeId}",
  },
  {
    name: "getUserUserSkillsUserId",
    method: "GET",
    path: "/User/UserSkills/{UserId}",
  },
  { name: "getUserUserMannage", method: "GET", path: "/User/UserMannage" },
  {
    name: "getUserUserDetailsUserId",
    method: "GET",
    path: "/User/UserDetails/{UserId}",
  },
  { name: "postUserCreateUser", method: "POST", path: "/User/CreateUser" },
  { name: "putUserUpdateUser", method: "PUT", path: "/User/UpdateUser" },
  { name: "deleteUserDeleteUser", method: "DELETE", path: "/User/DeleteUser" },
  {
    name: "putUserReverseToActiveUser",
    method: "PUT",
    path: "/User/ReverseToActiveUser",
  },
  {
    name: "postUserAddUserAccess",
    method: "POST",
    path: "/User/AddUserAccess",
  },
  { name: "postBanPreview", method: "POST", path: "/Ban/Preview" },
  { name: "postBanCreate", method: "POST", path: "/Ban/Create" },
  { name: "postBanLift", method: "POST", path: "/Ban/Lift" },
  { name: "getBanCases", method: "GET", path: "/Ban/Cases" },
  { name: "getBanIdentities", method: "GET", path: "/Ban/Identities" },
  { name: "getBanStats", method: "GET", path: "/Ban/Stats" },
  { name: "getBanLookup", method: "GET", path: "/Ban/Lookup" },
];

const fillPath = (template, values = {}) =>
  template.replace(/\{([^}]+)\}/g, (match, key) => {
    const value = values[key] ?? values[key[0].toLowerCase() + key.slice(1)];
    if (value === undefined || value === null || value === "") {
      throw new Error(`Path parameter ${key} was not provided for this request.`);
    }
    return encodeURIComponent(String(value));
  });

export const requestAcademyApi = (endpointName, options = {}) => {
  const endpoint = academyEndpoints.find((item) => item.name === endpointName);
  if (!endpoint) throw new Error(`Unknown API: ${endpointName}`);
  const { path = {}, params, data, config = {} } = options;
  return http.request({
    ...config,
    method: endpoint.method,
    url: fillPath(endpoint.path, path),
    ...(params !== undefined ? { params } : {}),
    ...(data !== undefined ? { data } : {}),
  });
};

export const academyApi = Object.freeze(
  Object.fromEntries(
    academyEndpoints.map(({ name }) => [
      name,
      (options = {}) => requestAcademyApi(name, options),
    ]),
  ),
);

export const getAcademyEndpoint = (name) =>
  academyEndpoints.find((item) => item.name === name);
