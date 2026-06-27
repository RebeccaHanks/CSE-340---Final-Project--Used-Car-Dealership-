import { getAllVehicles, getVehicleById } from '../models/vehicle.js';

async function showVehicles(req, res) {
  try {
    const vehicles = await getAllVehicles();

    res.render('vehicles/index', {
      title: 'Vehicles',
      vehicles
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading vehicles');
  }
}

async function showVehicleDetail(req, res) {
  try {
    const vehicle = await getVehicleById(req.params.id);

    res.render('vehicles/detail', {
      title: 'Vehicle Details',
      vehicle
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading vehicle');
  }
}

export {
  showVehicles,
  showVehicleDetail
};