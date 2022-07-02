const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const Courses =[
{id:1,name:'course1'},
{id:2,name:'course2'},
{id:3,name:'course3'},
{id:4,name:'course4'},

];

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/api/courses',(req,res)=>{

res.send(Courses);

});



app.post('/api/courses',(req,res)=>{
    const { error } = validateCourse(req.body);
    if(error){
      res.status(400).send(error.details[0].message);
      return;
  }

/*  OR const schema={
    name:Joi.string().min(3).required()
 };

  const result = Joi.validate(req.body,schema);

//if(!req.body.name||req.body.name.length<3){
if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
}*/

const course={
    id: Courses.length+1,
    name:req.body.name
};
Courses.push(course);
res.send(course);

});


app.put('/api/course/:id',(req,res)=>{
 
    //look up the course
    //if not existing,return 404
    const course =Courses.find(c => c.id===parseInt(req.params.id));
    if (!course) {res.status(404).send('the course with given id not found')};

    //validate
    //if invalid ,return 400 - badrequest
    const schema={
        name:Joi.string().min(3).required()
     };
    
      //const result = Joi.validate(req.body,schema);
      const result = validateCourse(req.body);
      const { error } = validateCourse(req.body);
      //if (result.error) 
      if(error)  return res.status(400).send(error.details[0].message);
        
    
    //update course
    course.name=req.body.name;
    //return the update course
    res.send(course);

});
function validateCourse(course) {
    const schema={
        name:Joi.string().min(3).required()
     };
     return Joi.validate(course,schema);
}



app.delete('/api/course/:id',(req,res) =>{
     //look up the course
    //if not existing,return 404
    const course =Courses.find(c => c.id===parseInt(req.params.id));
    if (!course) {res.status(404).send('the course with given id not found')};

    //delete
  const index =Courses.indexOf(course);
  Courses.splice(index,1);
  res.send(course);

})



app.get('/api/courses/:id', (req,res)=>{
const course =Courses.find(c => c.id===parseInt(req.params.id));
if (!course) {res.status(404).send('the course with given id not found')};
res.send(course);


});
//port
const port= process.env.PORT || 3100;

app.listen(3100,() => console.log(`listen on port ${port}...`));
 