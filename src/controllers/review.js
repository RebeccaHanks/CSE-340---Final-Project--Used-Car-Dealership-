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

    const returnPage = req.get('Referer') || '/vehicles';

    const deletedReview = await deleteReview(id);

    if (!deletedReview) {
      return res.status(404).send('Review not found');
    }

    res.redirect(returnPage);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting review');
  }
}