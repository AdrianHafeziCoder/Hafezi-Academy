import { academyApi } from "./academyApi";

// ===== Tickets (Tickets) =====
// params: { pageNumber, perPage, query }

export const getTicketsAll = (params = {}) =>
  academyApi.getTicketAllTickets({ params });

export const getTicketsNotAccepted = (params = {}) =>
  academyApi.getTicketAllTicketsNotAccepted({ params });

export const getTicketsMine = (params = {}) =>
  academyApi.getTicketAllTicketsMine({ params });

// Path parameter only (no body)
export const acceptTicket = (ticketId) =>
  academyApi.patchTicketAcceptTicketTicketId({ path: { ticketId } });

// params: { title }
export const checkExistTicket = (params) =>
  academyApi.patchTicketCheckExistTicket({ params });

export const getTicketChat = (id) =>
  academyApi.getTicketMessageChatDetailUserId({ path: { id } });

// body: { text, ticketId }
export const sendSupportMessage = (data) =>
  academyApi.postTicketMessageSendSupport({ data });

// body: { text, ticketId }
export const sendUserMessage = (data) =>
  academyApi.postTicketMessageSendUser({ data });

export const autoCompleteTicket = (text) =>
  academyApi.getTicketAutoCompleteText({ path: { text } });
