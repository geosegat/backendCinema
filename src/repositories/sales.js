const { cinemaQueue } = require("../queue");
const TicketModel = require("./tickets");

exports.BuyTicket = async (id, userId) => {
  const ticketModel = await TicketModel.getById(id);
  ticketModel.user_id = userId;

  await TicketModel.update(id, ticketModel);
  cinemaQueue.callNext();
};
