const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },  
        body: data,
    });

    return await res.json();
};

const getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};

const getPrettyDate = (some_date) => {
    const date = new Date(Date.parse(some_date));

    const day = date.getDate(),
          year = date.getFullYear();

    const months = [
        'января', 'февраля', 'марта', 'апреля',
        'майя', 'июня', 'июля', 'августа',
        'сентября', 'октября', 'ноября', 'декабря'
    ]

    const month = months[date.getMonth()];

    return `${day} ${month} ${year}`;
};

export {postData, getResource, getPrettyDate};