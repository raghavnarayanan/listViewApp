import React, { Component } from 'react';
import './App.css';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Switch, Redirect} from 'react-router';
import TextField from 'material-ui/TextField';
import * as _ from "lodash";
import Book from '@material-ui/icons/Book';

var titleStyle = {
  "fontWeight": "bold",
  "textAlign": "center"
};
var buttonStyle = {
  "backgroundColor": "#7eb7d6",
  "marginLeft": "5%",
  "marginRight": "5%",
  "borderColor": "#27485b"
};
var editPageStyle = {
  "margin": "1%"
};
var textBoxStyle = {
  "width": '100%'
};
var currentItem = {};
var pageSize = 10;
var startFrom = 0;
var inventory = 
      [
        {
          "id": "f0548a17-fa3a-4a98-8221-cb7135de2241",
          "title": "OWASP Top 10",
          "slug": "owasp-top-10",
          "description": "The OWASP Top Ten is a well-established guideline for any technology professional responsible for building secure web applications. The Top Ten list is referenced by many standards and publications and offers tremendous, actionable value to learners looking to build secure software.",
          "time": 1800,
          "graphic": {
            "alt": "OWASP Top 10",
            "src": "http://lorempixel.com/600/480/sports/"
          },
          "language": "en",
          "skill": "basic",
          "date_created": "2017-01-01 17:45:59",
          "last_update": "2017-05-10 20:32:54",
          "lessons_count": 25
        },
        {
          "id": "2ff28160-338c-44f9-88df-975f7b54b816",
          "title": "Foundations of Software Security",
          "slug": "foss",
          "description": "Dive into the basics of software security inside the development process. This course introduces the fundamentals of software security problems, risks, and general approaches for producing better software. It also describes an approach to building software security into the development processes to help you produce better software. This course was created by the experts who literally wrote the book on software security. The approaches described here are currently being utilized by leading global companies with mature software security initiatives.",
          "time": 5400,
          "graphic": {
            "alt": "Foundations of Software Security",
            "src": "http://lorempixel.com/600/480/city/"
          },
          "language": "en",
          "skill": "advanced",
          "date_created": "2017-01-09 18:40:02",
          "last_update": "2017-05-01 15:58:27",
          "lessons_count": 20
        },
        {
          "id": "1ad52ca1-14ef-4a2e-8aa3-2033f14afc09",
          "title": "Foundations of Information Security Awareness",
          "slug": "FISA",
          "description": "Security Awareness is a process of constant re nement and education. Every person has a key role in keeping their company secure and out of the headlines. This course will walk through what it takes to e ectively identify and act upon security risks in your personal and work lives.",
          "time": 4500,
          "graphic": {
            "alt": "Foundations of Information Security Awareness",
            "src": "http://lorempixel.com/600/480/people/"
          },
          "language": "en",
          "skill": "intermediate",
          "date_created": "2017-02-03 21:30:00",
          "last_update": "2017-04-16 17:26:09",
          "lessons_count": 15
        },
        {
          "id": "e98d5889-616b-4033-bc68-68e54585d90f",
          "title": "Attack and Defense",
          "slug": "a_a_d",
          "description": "Web applications are becoming an increasingly high-value target for hackers looking to make a quick buck, damage reputations, or just boost their “street cred.” There is no shortage of publicly known attack tools and techniques, and as software developers we are outnumbered and at the front line of the defense. This course will teach you how vulnerabilities are discovered and exploited in the real world and how to build a strong line of defense.",
          "time": 5400,
          "graphic": {
            "alt": "Attack and Defense",
            "src": "http://lorempixel.com/600/480/transport/"
          },
          "language": "en",
          "skill": "intermediate",
          "date_created": "2017-02-04 03:24:26",
          "last_update": "2017-02-10 22:39:51",
          "lessons_count": 10
        },
        {
          "id": "3095cfdd-7c08-476c-955c-0d03f3896263",
          "title": "Developing Securely for PCI DSS",
          "slug": "pci",
          "description": "Vulnerabilities to payment card security are a threat to everyone with a credit or debit card in their wallet. Every day, we e ectively transmit highly personal and sensitive data about ourselves to strangers. If all goes well, only the intended recipients ever see our information. If not, the results can be disastrous. Thus the criticality of the Payment Card Industry Data Security Standard (PCI DSS). PCI DSS provides guidance to organizations that collect, process, transmit, or store cardholder data. In this course, you will learn about PCI DSS: the data it is intended to secure, its requirements, how to incorporate those requirements into code, and how to avoid common mistakes that can make your software vulnerable to attack.",
          "time": 3600,
          "graphic": {
            "alt": "Developing Securely for PCI DSS",
            "src": "http://lorempixel.com/600/480/animals/"
          },
          "language": "en",
          "skill": "advanced",
          "date_created": "2017-02-17 18:53:27",
          "last_update": "2017-04-16 17:23:40",
          "lessons_count": 12
        },
        {
          "id": "b4266287-e11d-4f0d-8164-361231faaa5a",
          "title": "Introduction to Cryptography for Developers and Architects",
          "slug": "crypto",
          "description": "Cryptography is used to address issues of con dentiality, data integrity, data origin, authentication, entity authentication, and non-repudiation. Although cryptography does not eliminate security issues, it does make them more manageable by reducing the task of protecting a large amount of data to a matter of protecting a relatively small key. This course discusses the use of cryptographic algorithms and techniques as they are typically applied within the practice of information security.",
          "time": 5400,
          "graphic": {
            "alt": "Introduction to Cryptography for Developers and Architects",
            "src": "http://lorempixel.com/600/480/food/"
          },
          "language": "en",
          "skill": "basic",
          "date_created": "2017-02-24 03:02:13",
          "last_update": "2017-04-08 21:18:15",
          "lessons_count": 14
        },
        {
          "id": "e3e5efe3-52f9-45da-9bf5-2c469a1c4357",
          "title": "Secure Password Storage",
          "slug": "sps",
          "description": "This course introduces popular approaches to user password protection and storage, analyzing their common weaknesses and those properties that help schemes resist attack.\nBy learning to evaluate password storage schemes through the properties of their building blocks (hashes, salts, and algorithms), you will be able to properly evaluate password storage options in your development framework, and to articulate the trade-o s between modern schemes. At course end, you will be able to select and harden through con guration your application’s password storage scheme, or select a suitable replacement that best meets your application’s needs.",
          "time": 4500,
          "graphic": {
            "alt": "Secure Password Storage",
            "src": "http://lorempixel.com/600/480/nature/"
          },
          "language": "en",
          "skill": "intermediate",
          "date_created": "2017-03-06 21:48:25",
          "last_update": "2017-04-08 13:32:37",
          "lessons_count": 16
        },
        {
          "id": "75c56d20-d356-4d6c-826c-51d03b4da7cf",
          "title": "Foundations of JavaScript and HTML5 Security",
          "slug": "javascript_html",
          "description": "As the 5th revision of the HTML standard, HTML5—and its integration with JavaScript—introduces new security risks that developers must mitigate when writing web front-end code. This course introduces common security vulnerabilities and how they can be exploited to damage a web application. It prepares you for Defensive Programming for JavaScript and HTML5 by explaining the client-side code attack surface so you can easily recognize the errors that can put an overall system at risk.",
          "time": 3600,
          "graphic": {
            "alt": "Foundations of JavaScript and HTML5 Security",
            "src": "http://lorempixel.com/600/480/business/"
          },
          "language": "en",
          "skill": "basic",
          "date_created": "2017-01-01 17:45:59",
          "last_update": "2017-04-06 08:05:26",
          "lessons_count": 18
        },
        {
          "id": "117831dd-27a5-4c71-92a1-ca02e8c05ad0",
          "title": "Foundations of Java Platform Security",
          "slug": "java_platform",
          "description": "The Java platform offers a powerful, versatile, and robust foundation for creating distributed applications. The platform’s speci c architecture and security model sets it apart from other environments. On the one hand, the platform provides developers and architects with a multitude of security features that can be leveraged to create resilient applications. On the other hand, some aspects of the Java platform have negative security implications that software developers must be aware of in order to avoid signi cant security issues.",
          "time": 4500,
          "graphic": {
            "alt": "Foundations of Java Platform Security",
            "src": "http://lorempixel.com/600/480/cats/"
          },
          "language": "en",
          "skill": "intermediate",
          "date_created": "2017-03-11 04:28:36",
          "last_update": "2017-04-04 12:26:20",
          "lessons_count": 20
        },
        {
          "id": "a080ba98-b31d-4999-9ecb-395f925ef779",
          "title": "Foundations of .NET Platform Security",
          "slug": "dot-net",
          "description": "The .NET platform serves as a powerful framework for developing a wide range of applications, from rich websites and desktop applications to versatile shared libraries and embedded systems. The platform’s speci c architecture and unique security model sets it apart from other environments. While these traits o er developers and architects a variety of enhancements to the capabilities of their applications, they also introduce speci c risks from an application security perspective.",
          "time": 5400,
          "graphic": {
            "alt": "Foundations of .NET Platform Security",
            "src": "http://lorempixel.com/600/480/technics/"
          },
          "language": "en",
          "skill": "advanced",
          "date_created": "2017-03-13 15:10:52",
          "last_update": "2017-03-21 15:14:05",
          "lessons_count": 17
        }
];

class App extends Component {
  render(){
    return (
      <Router>
      <Switch>
        <Route exact path="/home" component={HomePage}/>
        <Route exact path="/edit" component={EditPage}/>
        <Redirect from='*' to='/home' />
      </Switch>
      </Router>
    );
  }
}

class EditPage extends Component {
  
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  cancelEdit(){
    this.props.history.push("/home");
    currentItem = {};
  }

  deleteCurrentCourse(){
    _.remove(inventory, course => {
      return course.id === currentItem.id
    });
    this.props.history.push("/home");
    currentItem = {};
  }

  saveCourseDetails(details){
    if(!_.isEmpty(currentItem)){
      // editing course
      inventory = _.map(inventory, item => {
        if(item.id === details.id){
          return details;
        }
        else{
          return item;
        }
      });
      currentItem = {};
    }
    else{
      // adding course
      inventory.push(details);
      currentItem = {};
    }
    this.props.history.push("/home");
  }

  getValue(scope, entity){
    var retVal = "";
    if(scope.state){
      retVal = _.get(scope.state, entity);
    }
    else if(currentItem){
      retVal = _.get(currentItem, entity);
    }
    return retVal;
  }
  
  render(){
    return(
      <div>
      <div>
        <header className="App-header">
            <h1 className="App-title">Edit Course</h1>
        </header>
      </div>
      <div style={editPageStyle}>
          <TextField
            id="title"
            label="Title"
            value={this.getValue(this, "title")}
            onChange={this.handleChange('title')}
            margin="normal"
            style={textBoxStyle}
          />
          <br/>
          <TextField
            id="slug"
            label="Slug"
            value={this.getValue(this, "slug")}
            onChange={this.handleChange('slug')}
            margin="normal"
            style={textBoxStyle}
          />
          <br/>
          <TextField
            id="description"
            label="Description"
            value={this.getValue(this, "description")}
            onChange={this.handleChange('description')}
            margin="normal"
            multiline = {true}
            style={textBoxStyle}
          />
          <br/>
          <TextField
            id="time"
            label="Time"
            value={this.getValue(this, "time")}
            onChange={this.handleChange('time')}
            margin="normal"
            style={textBoxStyle}
          />
          <br/>
          <TextField
            id="graphicAlt"
            label="Graphic - alt"
            value={this.getValue(this, "graphic.alt")}
            onChange={this.handleChange('graphicAlt')}
            margin="normal"
            style={textBoxStyle}
          />
          <br/>
          <TextField
            id="graphicSrc"
            label="Graphic - src"
            value={this.getValue(this, "graphic.src")}
            onChange={this.handleChange('graphicSrc')}
            margin="normal"
            style={textBoxStyle}
          />
          <br/>
          <TextField
            id="language"
            label="Language"
            value={this.getValue(this, "language")}
            onChange={this.handleChange('language')}
            margin="normal"
            style={textBoxStyle}
          />
          <br/>
          <TextField
            id="skill"
            label="Skill"
            value={this.getValue(this, "skill")}
            onChange={this.handleChange('skill')}
            margin="normal"
            style={textBoxStyle}
          />
          <br/>
          <TextField
            id="dateCreated"
            label="Date Created"
            value={this.getValue(this, "date_created")}
            onChange={this.handleChange('dateCreated')}
            margin="normal"
            style={textBoxStyle}
          />
          <br/>
          <TextField
            id="lastUpdate"
            label="Last Update"
            value={this.getValue(this, "last_update")}
            onChange={this.handleChange('lastUpdate')}
            margin="normal"
            style={textBoxStyle}
          />
          <br/>
          <TextField
            id="lessonsCount"
            label="Lessons Count"
            value={this.getValue(this, "lessons_count")}
            onChange={this.handleChange('lessonsCount')}
            margin="normal"
            style={textBoxStyle}
          />
          <br/>
          <Button
            style={buttonStyle}
            onClick={() => this.saveCourseDetails(
              {
                id: currentItem.id || new Date().getTime(),
                title: document.getElementById("title").value,
                slug: document.getElementById("slug").value,
                description: document.getElementById("description").value,
                time: document.getElementById("time").value,
                graphic:{
                  alt: document.getElementById("graphicAlt").value,
                  src: document.getElementById("graphicSrc").value
                },
                language: document.getElementById("language").value,
                skill: document.getElementById("skill").value,
                date_created: document.getElementById("dateCreated").value,
                last_update: document.getElementById("lastUpdate").value,
                lessons_count: document.getElementById("lessonsCount").value
              }
            )}>
            Save
          </Button>
          <Button
            style={buttonStyle}
            onClick={() => this.cancelEdit()}
          >
          Cancel
          </Button>
          <Button
            style={buttonStyle}
            onClick={() => this.deleteCurrentCourse()}
            disabled={_.isEmpty(currentItem)}
          >
          Delete
          </Button>
      </div>
      </div>
    ) ;
  }
}

class HomePage extends Component {
  onClick(me){
    currentItem = me;
    this.props.history.push("/edit");
  };

  getValue(scope){
    var retVal = pageSize;
    if(scope.state){
      retVal = _.get(scope.state, "pageSize");
    }
    return retVal;
  }

  navigateToPrevPage() {
    startFrom -= parseInt(pageSize);
    this.props.history.push("/home");
  }

  navigateToNextPage() {
    startFrom += parseInt(pageSize);
    this.props.history.push("/home");
  }

  handlePageSizeChange = name => event => {
    this.setState({
      "pageSize": event.target.value,
    });
    pageSize = event.target.value;
    this.props.history.push("/home");
  };

  renderListView(course){
    return(
        <ListItem key={course.id}>
          <div>
            <ListItemIcon>
              <Book />
            </ListItemIcon>
          </div>
          <div>
            <ListItemText style={titleStyle}>{course.title}</ListItemText>
            <ListItemText
              onClick={() => this.onClick(course)}>{course.description} 
            </ListItemText>
          </div>
        </ListItem>
    );
  }

  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Course Listing</h1>
        </header>
        
        <List>
          {inventory.slice(startFrom, startFrom + parseInt(pageSize)).map(course => {
            return this.renderListView(course)
          })}
        </List>
        <Button
          style={buttonStyle} 
          onClick={() => {this.props.history.push("/edit")}}
        >
          Add Course
        </Button>
        
        <Button
          style={buttonStyle} 
          onClick={() => this.navigateToPrevPage()}
        >
          Prev
        </Button>
        <TextField
            id="pageSize"
            label="Courses per page: "
            value={this.getValue(this)}
            onChange={this.handlePageSizeChange('pageSize')}
            margin="normal"
        />
        <Button
          style={buttonStyle} 
          onClick={() => this.navigateToNextPage()}
        >
          Next
        </Button>
      </div>
    );
  }
  
}

export default App;
