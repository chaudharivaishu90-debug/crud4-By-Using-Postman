const cl=console.log;
const PORT=5000;
const app=require("./app");
app.listen(5000,()=>{
    cl(`server is running on port${PORT}`)
})
