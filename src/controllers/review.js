import {
  createReview,
  deleteReview
} from '../models/review.js';

export async function addReview(req, res) {
  try {
    const { vehicle_id, rating, comment } = req.body;

    const accountId =
      req.session.account.account_id;

    await createReview(
      accountId,
      vehicle_id,
      rating,
      comment
    );

    res.redirect(`/vehicles/${vehicle_id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating review');
  }
}

export async function removeReview(req, res) {
  try {
    const { id } = req.params;

    await deleteReview(id);

    res.redirect('back');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting review');
  }
}