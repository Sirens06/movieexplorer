//qui si fa solamente la chiamata http get e si ritorna il json
const getService = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export default getService