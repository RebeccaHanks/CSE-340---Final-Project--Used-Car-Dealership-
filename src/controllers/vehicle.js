import {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle
} from '../models/vehicle.js';

import { getAllCategories } from '../models/category.js';

export async function showVehicles(req, res) {
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

export async function showVehicleDetail(req, res) {
  try {
    const vehicle = await getVehicleById(req.params.id);

    if (!vehicle) {
      return res.status(404).send('Vehicle not found');
    }

    res.render('vehicles/detail', {
      title: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
      vehicle
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading vehicle details');
  }
}

export async function showManageVehicles(req, res) {
  try {
    const vehicles = await getAllVehicles();

    res.render('vehicles/manage', {
      title: 'Manage Vehicles',
      vehicles
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading vehicle management page');
  }
}

export async function showAddVehicle(req, res) {
  try {
    const categories = await getAllCategories();

    res.render('vehicles/add', {
      title: 'Add Vehicle',
      categories
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading add vehicle page');
  }
}

export async function addVehicle(req, res) {
  try {
    await createVehicle(req.body);
    res.redirect('/vehicles/manage');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding vehicle');
  }
}

export async function showEditVehicle(req, res) {
  try {
    const vehicle = await getVehicleById(req.params.id);
    const categories = await getAllCategories();

    if (!vehicle) {
      return res.status(404).send('Vehicle not found');
    }

    res.render('vehicles/edit', {
      title: 'Edit Vehicle',
      vehicle,
      categories
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading edit vehicle page');
  }
}

export async function editVehicle(req, res) {
  try {
    await updateVehicle(req.params.id, req.body);
    res.redirect('/vehicles/manage');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating vehicle');
  }
}

export async function removeVehicle(req, res) {
  try {
    await deleteVehicle(req.params.id);
    res.redirect('/vehicles/manage');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting vehicle');
  }
}