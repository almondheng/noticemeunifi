import axios from 'axios';

const url = "https://bde99f02.ngrok.io"

export const generateFile = async () => {
    return axios.get(url + "/scrape")
}

export const getTweets = async () => {
    return axios.get(url + "/model")
}

export const getIsDone = async () => {
    return axios.get(url + "/done")
}

export const postIsDone = async (id) => {
    return axios.post(url + "/done", id)
}

export const getDismiss = async () => {
    return axios.get(url + "/dismiss")
}

export const postDismiss = async (id) => {
    return axios.post(url + "/dismiss", id)
}

export const postTweet = async (payload) => {
    return axios.post(url + "/reply", payload)
}

export const postMessage = async (payload) => {
    return axios.post(url + "/message", payload)
}

export const getEnTopic = async () => {
    return axios.get(url + "/eng_sentiment")
}

export const getBmTopic = async () => {
    return axios.get(url + "/malay_sentiment")
}