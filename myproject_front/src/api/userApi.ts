import {$host} from './axiosApi.js'

export const getListOfItems = async ({min, max}: { min: number, max: number }) => {
    try {
        const response = await $host.get(
            `http://numbersapi.com/random?min=${min}&max=${max}`,
            {}
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null; // Or handle the error differently
    }
};