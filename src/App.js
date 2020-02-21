import React, { Component } from 'react';
import './App.css';

import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from "./components/TaskList";
import _ from 'lodash';
// import { findIndex, filter } from 'lodash';
class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            tasks : [],
            isDisplayForm : false,
            taskEditing : null,
            filter : {
                name: '',
                status: -1  
            },
            keyword: '',
            sortBy: 'name',
            sortValue: 1
        }
    }

    //f5 thi goi  componentWillMount
    UNSAFE_componentWillMount(){
        if(localStorage && localStorage.getItem('tasks')){
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks : tasks
            });
        }
    }




    generateData = () => {
        var tasks = [
            {
                id: this.generateID(),
                name: 'hoc lap trinh',
                status: true
            },
            {
                id: this.generateID(),
                name: 'hoc nhung',
                status: false
            },
            {
                id: this.generateID(),
                name: 'hoc bay',
                status: true
            },
        ];
        this.setState({
            tasks : tasks
        });
        
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
    }


    s4(){
        return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
    }

    generateID(){
        return this.s4() + this.s4() + '-' + this.s4();
    }

    onToggleForm = () =>{
        if(this.state.isDisplayForm && this.state.taskEditing !== null){
            this.setState({
                isDisplayForm: true,
                taskEditing: null
            });
        } else{
        this.setState({
            isDisplayForm : !this.state.isDisplayForm,
            taskEditing: null
        });
        }
    }

    onCloseForm= () =>{
        this.setState({
            isDisplayForm : false
        });
    }

    onOpenForm= () =>{
        this.setState({
            isDisplayForm : true
        });
    }


    onSubmit = (data) => {
        var { tasks } = this.state;
        if(data.id === ''){
            data.id = this.generateID();
            tasks.push(data);
        }else {
            var index = this.findIndex(data.id);
            tasks[index] = data;
        }
        this.setState({
            tasks : tasks,
            taskEditing: null
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onUpdateStatus = (id) =>{
        var { tasks } = this.state;
        // var index = this.findIndex(id);
        var index = _.findIndex(tasks, (task) => {
            return task.id === id
        });
        if(index !== -1){
            tasks[index].status = !tasks[index].status;
            this.setState({
                tasks : tasks
            });
             localStorage.setItem('tasks', JSON.stringify(tasks));
        }
       
    }

    findIndex = (id) => {
        var { tasks } = this.state;
        var result =-1;
        tasks.forEach((task, index) => {
            if(task.id === id){
                result = index;
            }
        });
        return result;
    }

    onDelete = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);

        if(index !== -1){
            tasks.splice(index, 1);
            this.setState({
                tasks : tasks
            });
             localStorage.setItem('tasks', JSON.stringify(tasks));
        }
       this.onCloseForm();
    }

    onUpdate = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);

        var taskEditing = tasks[index];
        
        this.setState({
            taskEditing: taskEditing
        });

        console.log(this.state.taskEditing);
        this.onOpenForm();
    }


    onFilter = (filterName, filterStatus) => {
        console.log(filterName, '-', filterStatus);
        // console.log(typeof filterStatus);
        filterStatus = parseInt(filterStatus, 10);
        // console.log(typeof filterStatus);
        this.setState({
            filter : {
            name : filterName.toLowerCase(),
            status: filterStatus 
            }
        });
    }

    onSearch = (keyword)=> {
        this.setState({
            keyword : keyword
        });
    }

    onSort = (sortBy, sortValue) => {
        this.setState({
            sortBy: sortBy,
            sortValue: sortValue
        });
        console.log(this.state);

    }

    render() { 
        // tuong dong voi var task = this.state.tasks
        var { tasks, isDisplayForm, taskEditing, filter, keyword, sortBy, sortValue } = this.state;
        // console.log(filter);
        if(filter){
            if(filter.name){
                tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(filter.name) !== -1; 

                });
            }
            if(true){
                tasks = tasks.filter((task) => {
                    if(filter.status === -1){
                        return task;
                    } else {
                        return task.status === (filter.status===1?true:false)
                    }
                });
            }
        }

        if(keyword){
            // console.log(keyword);
            
                console.log(keyword+'s');
                // tasks = tasks.filter((task) => {
                //     return task.name.toLowerCase().indexOf(keyword) !== -1; 
                // });
            tasks = _.filter(tasks, (task)=>{
                return task.name.toLowerCase().indexOf(keyword.toLowerCase())
                !== -1;
            });
        }

        if(sortBy==='name'){
            tasks.sort((a,b)=>{
                if(a.name > b.name) return sortValue;
                else if(a.name<b.name) return -sortValue;
                else return 0;
            });
        } else {
            tasks.sort((a,b)=>{
                if(a.status > b.status) return sortValue;
                else if(a.status<b.status) return -sortValue;
                else return 0;
            });
        }

        var elmTaskForm = isDisplayForm ? 
        <TaskForm 
            onCloseFormToTaskForm={this.onCloseForm}
            onSubmitToTaskForm ={this.onSubmit}
            task={taskEditing}
        /> : ''; 

        return (
        <div>
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr/>
                </div>
                
                <div className="row">
                    <div className={isDisplayForm?"col-xs-4 col-sm-4 col-md-4 col-lg-4":
                        ""}>
                        {/*<TaskForm />*/}
                        { elmTaskForm }
                    </div>
                    <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" :
                        "col-xs-12 col-sm-12 col-md-12 col-lg-12"}> 
                        <button 
                            type="button" 
                            className="btn btn-primary"
                            onClick={this.onToggleForm}
                        >
                            <span className="fa fa-plus mr-5"></span>
                            Thêm Công Việc
                        </button>

                        <button type="button" className="btn btn-danger" onClick={ this.generateData }>
                            generate data
                        </button>
                        <Control 
                            onSearch = { this.onSearch }
                            onSort = {this.onSort}
                            sortBy = {sortBy}
                            sortValue = {sortValue}
                        />

                        <TaskList 
                            onFilter = {this.onFilter}
                            onUpdateStatusToTaskList={this.onUpdateStatus} 
                            onDeleteToTaskList={this.onDelete} 
                            onUpdateToTaskList={this.onUpdate} 
                            keyTasksToTaskList = { tasks }/>
                    </div>
                </div>
            </div>
            <script src="//code.jquery.com/jquery.js"></script>
    </div>
    );
  }
}

export default App;
