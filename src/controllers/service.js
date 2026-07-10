import {
  createServiceRequest,
  getAllServiceRequests,
  updateServiceRequest
} from '../models/service.js';

export async function buildServicePage(req, res) {
  try {
    const requests = await getAllServiceRequests();

    res.render('service/index', {
      title: 'Service Requests',
      requests,
      account: req.session.account
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading service requests');
  }
}

export async function createRequest(req, res) {
  try {
    const {
      vehicle_id,
      service_type,
      description
    } = req.body;

    const account_id = req.session.account.account_id;

    await createServiceRequest({
      account_id,
      vehicle_id: vehicle_id || null,
      service_type,
      description
    });

    res.redirect('/service');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating service request');
  }
}

export async function updateRequest(req, res) {
  try {
    const { id } = req.params;
    const { status, employee_notes } = req.body;

    await updateServiceRequest(
      id,
      status,
      employee_notes
    );

    res.redirect('/service');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating service request');
  }
}