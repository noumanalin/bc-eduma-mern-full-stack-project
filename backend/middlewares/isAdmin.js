
export const isAdmin = async (req, res, next) => {
    try {
        const user = req.user;
        if(user?.role != "admin" || user.role==="user"){
            return res.status(400).json({success:false, message:"user not admin!"})
        }

        if(user?.role === "admin"){
            req.isAdmin = true;
            req.admin = user;
            next();
        }
    } catch (error) {
        console.log(`❌ isAdmin Middleware Error: ${error.message}`);
        return res.status(500).json({success:false, message:"internal server error", error:error.messag})
    }
}