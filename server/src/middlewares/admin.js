const admin =(req,res,next)=>{
     console.log(req.user.role);
    if(req.user && req.user.role ==="admin"){
        next();
    }
    else{
        res.status(500).json({message : "access denied"})
    }
}
export default admin