import {data} from "../data/data.js"

export const getAllData = async (req, res) => {
    try {
        const { ageGroup, gender, startDate, endDate } = req.query;

        // Filter data based on query parameters
        let filteredData = data;

        if (ageGroup) {
            filteredData = filteredData.filter(item => item.Age === ageGroup);
        }

        if (gender) {
            filteredData = filteredData.filter(item => item.Gender === gender);
        }

        if (startDate && endDate) {
            filteredData = filteredData.filter(item => {
                const date = new Date(item.Day);
                return date >= new Date(startDate) && date <= new Date(endDate);
            });
        };

        return res.status(200).json({ success: true, filteredData });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}