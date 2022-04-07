const fs=require('fs');
const {create}=require('ipfs-http-client');
const ipfs=create();
const data=require('../model/datamodel')

exports.uploadImage=async(req,res)=>{
    if(req.files){
        var file=req.files.file
        var fileName=file.name
        console.log((fileName));
        var filePath='./uploads/'+fileName   
        file.mv(filePath, async (err) => {
            if (err){
                console.log('Error: failed to download the file');
                return res.status(500).send(err);
            }            
            const fileHash = await addFile(fileName,filePath);
            console.log(fileHash)
            const data1=new data({"fileName":fileName,"fileHash":fileHash})
            const data2=await data1.save()
            console.log(data2)
            res.send("File uploaded..")
            fs.unlink(filePath, (err) => { if (err) console.log(err); });
        }) 
    }
}

const addFile = async (fileName,filePath) => {
    const file = fs.readFileSync(filePath);
    const fileAdded = await ipfs.add({path: fileName,content:file});
    const {cid} = fileAdded;
    return cid;
};