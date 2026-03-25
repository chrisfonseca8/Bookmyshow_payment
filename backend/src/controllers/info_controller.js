const checking =async (req,res) => {
    return res.status(200).json({message:'routes are working'});


}

module.exports = {
    checking
}