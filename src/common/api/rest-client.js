const performRequest = (request) => {
    return fetch(request)
        .then(
            function(response) {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(response);
            }
        );
}

export default {
    performRequest
}