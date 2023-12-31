const UserInteraction = require('../models/userInteractionsModel');
const Listing = require('../models/listingsModel');

const getUserPDFanalytics = async (req, res) => {
    const { userId } = req.params;
    try {
        const userInteractions = await UserInteraction.find({
            userId: userId,
            interactionType: 'pdf'
        });
        res.status(200).json({ pdfCount: userInteractions.length });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getUserPayanalytics = async (req, res) => {
    const { userId } = req.params;
    try {
        const userInteractions = await UserInteraction.find({
            userId: userId,
            interactionType: 'pay'
        });
        res.status(200).json({ payCount: userInteractions.length });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getUserClickanalytics = async (req, res) => {
    const { userId } = req.params;
    try {
        const userInteractions = await UserInteraction.find({
            userId: userId,
            interactionType: "click"
        });
        res.status(200).json({ clickCount: userInteractions.length });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getUserCaranalytics = async (req, res) => {
    const { userId } = req.params;
    try {
        const userCars = await Listing.find({ uid: userId });
        res.status(200).json({ carCount: userCars.length });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getUserPDFanalytics,
    getUserPayanalytics,
    getUserClickanalytics,
    getUserCaranalytics,
}