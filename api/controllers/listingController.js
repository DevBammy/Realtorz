import Listing from '../models/listingModel.js';
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    next(errorHandler(404, 'Listing not found'));
    return;
  }

  if (req.user.id !== listing.userRef) {
    next(errorHandler(401, 'you can only delete your own listing'));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing deleted succesfully');
  } catch (error) {
    next(error);
  }
};
