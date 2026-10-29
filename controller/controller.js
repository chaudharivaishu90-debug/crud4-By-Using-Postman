const {todoArr}= require("../data/data");

const getAll=(req,res)=>{
    try{
        res.status(200).json({
            success:true,
            message:"data fetched",
            body:todoArr
        })

    }catch(err){
        res.status(500).json({
            success:false,
            message:"server error",
            body:todoArr,
            err:err.message
        })


    }
}


const getSingle=(req,res)=>{
    try{
        let todoid=req.params.id;
        let todo=todoArr.find(t=>t.id===todoid);
        if(!todo){
            return res.status(404).json({
                success:false,
                message:`Todoid not found with ${todoid}`
            })
        }
            res.status(200).json({
                 success:true,
                 body:todo,
                message:`Todoid is fetched with ${todoid}`
            
            });
    }catch(err){
        res.status(500).json({
             success:false,
                message:`something wrong`,
                error:err.message
            
        })

    }
}

const CreateData = (req, res) => {
    try {
        let body = req.body;

        if (
            !body.title ||
            typeof body.completed===!"boolean"
            
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all  data"
            });
        }

        let newobj = {
            title:body.title,
            completed:body.completed,
            id: Date.now()
        };

        todoArr.push(newobj);

        return res.status(201).json({
            success: true,
            data: newobj,
            message:`data created sucsessfully!!`
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "something went wrong",
            error:err.message
            
        });
    }
};



// update
const updateDtaa=(req,res)=>{
    try{
        let todoid= req.params.id;
        let index= todoArr.findIndex(t=>t.id===todoid)
        if(index===-1){
            return res.status(404).json({
                success: false,
                message: `todo  not found with id ${todoid}`
            });

        }
                let body=req.body;

        if(!body.title ||
            typeof body.completed !== "boolean"){
                return res.status(400).json({
                success: false,
                message: "Please provide blog data"
            });
            }
            let upobj={
                ...todoArr[index],
                ...body,
                id:todoArr[index].id
            };
            todoArr[index]=upobj;

             res.status(200).json({
            success: true,
            message: `todo updated successfully with id ${todoid}`,
            data: upobj
        });

    }catch(err){
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err.message
        });
    }

}


// delete
const DeletePost=(req,res)=>{
    try{
        let Remove_id=Number(req.params.id);
        let index=todoArr.findIndex(t=>t.id==Remove_id)
        if(index=== -1){
            return res.status(404).json({
                success:false,
                message:`todo not found with id ${Remove_id}`
            });
        }
        todoArr.splice(index,1)
        res.status(200).json({
            success:true,
                message:`todo sucsesfully deleted with id ${Remove_id}`
           
        });

    }catch(err){
        res.status(500).json({
            success:false,
            message:"server error",
            err:err.message

        })


    }
}


module.exports={
    getAll,
    getSingle,
    CreateData,
    DeletePost,
    updateDtaa
}
