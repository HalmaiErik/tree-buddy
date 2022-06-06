const convertEpochToDate = (epoch) => {
    return new Date(parseInt(epoch) * 1000).toUTCString();
};

export { convertEpochToDate };