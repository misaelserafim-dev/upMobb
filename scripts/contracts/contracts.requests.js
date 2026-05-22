import { contractsMock } from "./contracts.mock.js";

const REQUEST_DELAY = 1000;

const awaitMoment = (time = REQUEST_DELAY) => {
    return new Promise(resolve => setTimeout(resolve, time));
};

export async function getContracts() {
    await awaitMoment();

    return [...contractsMock];
}