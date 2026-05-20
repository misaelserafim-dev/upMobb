import { contractsMock } from "./contracts.mock.js";

const delay = (time = 1200) => new Promise(resolve => setTimeout(resolve, time));

export async function getContracts() {
    await delay();

    return [...contractsMock];
}