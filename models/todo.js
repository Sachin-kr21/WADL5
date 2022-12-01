// models/todo.js
'use strict';
const { Model }= require('sequelize');
const { Op }= require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      // FILL IN HERE
      var overdue_items=await this.overdue()
      var i=0
      while(i<overdue_items.length){
      console.log(overdue_items[i].displayableString())
      i++
      }

      console.log("\n");
      console.log("Due Today");
      // FILL IN HERE
      var duetoday_items=await this.dueToday()
      var i=0
      while(i<duetoday_items.length){
      console.log(duetoday_items[i].displayableString())
      i++
      }
      console.log("\n");
      console.log("Due Later");
      // FILL IN HERE
      var duelater_items=await this.dueLater()
      var i=0
      while(i<duelater_items.length){
      console.log(duelater_items[i].displayableString())
      i++
      }

    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      // retrieve items from table 
      // return list of items where due date is less than todays date
      try{
        const overdues = await Todo.findAll({
          where: {
            dueDate:{
              [Op.lt]: new Date()
            }
        
          }
        })
        return overdues
      }
      catch(error){
        console.log(error);
      }
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      try{
        const overdues = await Todo.findAll({
          where: {
            dueDate:{
              [Op.eq]: new Date()
            }
        
          }
        })
        return overdues
      }
      catch(error){
        console.log(error);
      }
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      try{
        const overdues = await Todo.findAll({
          where: {
            dueDate:{
              [Op.gt]: new Date()
            }
        
          }
        })
        return overdues
      }
      catch(error){
        console.log(error);
      }
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      await Todo.update(
        {completed : true},{where :{id:id}}

      )
      
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title}${this.dueDate === new Date().toLocaleDateString("en-CA") ? "":" "+this.dueDate }`;
    }
  }
  Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};
