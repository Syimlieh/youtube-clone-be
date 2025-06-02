// using constant for consistence and easier management of any constant value.
export const STATUS_MESSAGE = {
    200: "OK",
    201: "Resource created successfully",
    400: "There are some missing or invalid values in your request.",
    404: "Resource not found.",
    500: "Server Error.",
};

export const COLLECTIONS = {
    PROFILE: 'profiles',
    FILE_METADATA: 'files_metadatas',
    VIDEOS: 'videos',
    LIKES: 'likes',
    COMMENTS: 'comments'
}
