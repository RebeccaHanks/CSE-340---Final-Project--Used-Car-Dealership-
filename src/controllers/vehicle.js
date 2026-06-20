export function buildVehicles(req, res) {
  res.render('vehicles/index', {
    title: 'Vehicle Inventory'
  });
}