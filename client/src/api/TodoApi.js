const url_main = "http://localhost:5000";

export const get_todo = (username) => {
    return url_main + `/user/${username}/todo`;
}