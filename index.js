const { Command } = require('commander');
const program = new Command();
const fs = require('fs');

program
  .name('string-util')
  .description('Todo app CLI')
  .version('1.0.0');

program.command('add')
  .description('Add a todo')
  .argument('<str>','str to add')
  .action((str)=>{
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        try{
            const jsonData = JSON.parse(data); // Convert JSON string to object

            const maxId = jsonData.reduce((max,item)=>Math.max(max,item.id),-1)
            const newTodo = {
                id: maxId + 1,
                data:str,
            };

            jsonData.push(newTodo);

            fs.writeFile("data.json", JSON.stringify(jsonData,null,2),err=>{
                if(err){
                    console.log(`Error adding data: ${err}`);
                } else{
                    console.log(`Added: [${newTodo.id}] ${newTodo.data}`);
                }
            });
        } catch(err){
            console.log('Invalid JSON format in data.json:', err);
        }
    });
  });

program.command('delete')
  .description('Delete a todo')
  .argument('<id>','ID of the todo to delete')
  .action((id)=>{
      const todoId = parseInt(id,10);
      
      fs.readFile('data.json', 'utf8', (err, data) => {
          if (err) {
              console.error('Error reading file:', err);
              return;
            }
            try{
                let jsonData = JSON.parse(data); // Convert JSON string to object
                
                const originalLength = jsonData.length;
                jsonData = jsonData.filter(item => item.id !== todoId); // Creates a new array with all items except the one with id === todoId
                
                if (jsonData.length === originalLength){
                    console.log(`Todo with id ${todoId} not found.`);
                    return;
                }
                
                fs.writeFile("data.json", JSON.stringify(jsonData,null,2),err=>{
                    if(err){
                        console.log(`Error updating data: ${err}`);
                    } else{
                        console.log(`Deleted todo with id ${todoId}`);
                    }
                });
            } catch(err){
                console.log('Invalid JSON format in data.json:', err);
            }
        });
    });
    
    
program.command('update')
    .description('Update a todo')
    .argument('<id>','ID of the todo to update')
    .argument('str','str to update the todo with')
    .action((id,str)=>{
        const todoId = parseInt(id,10);
        
        fs.readFile('data.json','utf-8',(err,data)=>{
            if(err){
                console.log(`Error reading data: ${err}`);
                return;
            } 
            try{
                let jsonData = JSON.parse(data);
                
                const todo = jsonData.find(item => item.id === todoId); // Find the todo with the given id
                
                if (!todo){
                    console.log(`Todo with ID ${todoId} not found`);
                    return;
                }
                
                todo.data = str;
                
                fs.writeFile("data.json", JSON.stringify(jsonData,null,2),err=>{
                    if(err){
                        console.log(err);
                    } else{
                        console.log(`Updated todo with id ${todoId}`);
                    }
                });
            } catch(err){
                console.error('Invalid JSON format in data.json:', err);
            }
        });
    });
    
program.command('print')
    .description('Print all the todos')
    .action(()=>{
        fs.readFile('data.json','utf-8',(err,data)=>{
            if(err){
                console.log(`Error reading data ${err}`);
            } else {
                try{
                    const jsonData = JSON.parse(data);

                    if(jsonData.length === 0){
                        console.log("No Todos Found");
                        return;
                    }

                    console.log("\nYour Todos");
                    console.log("-------------");

                    jsonData.forEach(todo => {
                        console.log(`ID:${todo.id} -> ${todo.data}`);
                    });

                } catch(err){
                    console.log('Invalid JSON format in data.json:', err)
                }
            }
        });
    });

program.parse();