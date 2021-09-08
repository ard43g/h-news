const baseUrl = "https://hacker-news.firebaseio.com/v0/";

export const getNewStoriesList = async () => {
    return await fetch(baseUrl + "newstories.json");
};
export const getOneNews = async (id) => {
    return await fetch(baseUrl + "item/" + id + ".json");
};
export const getComment = getOneNews;
