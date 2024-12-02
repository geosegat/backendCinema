const SalesRepository = require("../repositories/sales");

exports.BuyTicket = async (req, res) => {
  console.log(req.params.ticketId, req.params.userId);
  await SalesRepository.BuyTicket(
    Number(req.params.ticketId),
    Number(req.params.userId)
  );
  res.json({ ok: true });
};
