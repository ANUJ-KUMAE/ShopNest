const AdminMiddleware = (req, resp, next) => {
    try {
        
        const Admin = req.user.isAdmin;

        if(!Admin)
        {
            return resp.status(401).json({message:"Access Denied"})
        }

        next();

    } catch (error) {
        next(error);
    }
}

module.exports = AdminMiddleware;