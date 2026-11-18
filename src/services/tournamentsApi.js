import { academyApi } from "./academyApi";

// ===== Tournaments (Tournament — admin section) =====

export const getTournaments = (params = {}) =>
  academyApi.getV2TournamentAdminTournament({ params });

export const getTournamentFull = (id) =>
  academyApi.getV2TournamentAdminTournamentFullId({ path: { id } });

// body: { name, termId, courseId }
export const createTournament = (data) =>
  academyApi.postV2TournamentAdminCreateTournament({ data });

// body: { id, status }
export const updateTournamentStatus = (data) =>
  academyApi.patchV2TournamentAdminStatusTournament({ data });

// ===== Mentors =====
export const getMentors = (params = {}) =>
  academyApi.getV2TournamentAdminMentor({ params });

// body: { name }
export const createMentor = (data) =>
  academyApi.postV2TournamentAdminCreateMentor({ data });

// ===== Score criteria =====
export const getScoreCriteria = (tournamentId) =>
  academyApi.getV2TournamentAdminScoreCriterionAllTournamentId({
    path: { tournamentId },
  });

// body: { name, tournamentId, min, max }
export const createScoreCriterion = (data) =>
  academyApi.postV2TournamentAdminScoreCriterionCreate({ data });

// body: { name, tournamentId, min, max, id }
export const updateScoreCriterion = (data) =>
  academyApi.putV2TournamentAdminScoreCriterionUpdate({ data });

export const deleteScoreCriterion = (id) =>
  academyApi.deleteV2TournamentAdminScoreCriterionDelId({ path: { id } });

// ===== Scores =====
export const getFullScore = (tournamentId) =>
  academyApi.getV2TournamentAdminFullScoreTournamentId({
    path: { TournamentId: tournamentId },
  });

export const getScoreDetail = (teamId, refreeId) =>
  academyApi.getV2TournamentAdminScoreDetailTeamIdRefreeId({
    path: { teamId, refreeId },
  });
