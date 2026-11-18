import http from "./http";

export const getTerms = () => http.get("/Term");
export const getTermById = (id) => http.get(`/Term/${encodeURIComponent(id)}`);
export const addTerm = (body) => http.post("/Term", body);
export const updateTerm = (body) => http.put("/Term", body);
export const addTermCloseDate = (body) =>
  http.post("/Term/AddTermCloseDate", body);
export const updateTermCloseDate = (body) =>
  http.put("/Term/UpdateTermCloseDate", body);
