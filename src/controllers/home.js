export function buildHome(req, res) {
  res.render('index', {
    title: 'Hanks Auto Sales'
  });
}