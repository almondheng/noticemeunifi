import axios from 'axios';

const url = "http://bde99f02.ngrok.io"

export const generateFile = async () => {
    return axios.get(url + "/scrape")
}

export const getTweets = async () => {
    return axios.get(url + "/model")
}
