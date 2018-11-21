import React from 'react';


const FormAddItem = (props) => {
   return(
      <form className="container" onSubmit={this.handleListPost}>
         <Input 
               type={"text"}
               title={"Todo Title"}
               name={"todoTitle"}
               value={this.state.title}
               placeholder={"ex. My Todos "}
               handleChange={this.handleChange}
         />
         <Input type={"text"}
               title = "todoList"
               name ={"todoList"}
               placeholder = {"ex. My first todo list "} 
         />
         <Button 
               type={"primary"}
               title={'+ New list'}
               addNewList = {this.addNewList}
         />
         <br/> <hr/>
         <Button 
               type={'primary'}
               title={'Submit'}
               handlePost = {this.handlePost}
         />
      </form>
   )
}

export default FormAddItem;