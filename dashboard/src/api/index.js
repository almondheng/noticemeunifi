import axios from 'axios';

const url = "http://bde99f02.ngrok.io"

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

export const postTweet = async (id) => {
    return axios.post(url + "/reply", id)
}

export const postMessage = async (id) => {
    return axios.post(url + "/message", id)
}