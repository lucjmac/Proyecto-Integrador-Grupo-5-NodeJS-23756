export const middlewareDelete = (req, res, next) => {

    if (req.method === "POST") {
        req.method = "DELETE";
        
    }
    next();
}