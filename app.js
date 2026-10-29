const cl=console.log;
let express=require(`express`);
const router=require(`./router/router.js`);

const app=express();
app.use(express.json());
app.use("/api/todoArr",router)
module.exports=app;
