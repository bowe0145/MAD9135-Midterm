/*eslint browser: true, node: true, white: true, unparam: true, sloppy: true*/
var React = require('react');
var ReactDOM = require('react-dom');
var contacts = require('./contacts.js');

var title = "Contact List";

// function by Joel Lord
function capitalizeFirst(word) {
    return word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase();
}
// function by Joel Lord
function capitalizeWords(phrase) {
    return phrase.split(" ").map(function (i) {
        return capitalizeFirst(i);
    }).join(" ");
}
// function by Joel Lord
function calculateAge(dob) {
    var birthday = new Date(dob);
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

class App extends React.Component {
    constructor (props) {
        super(props);
    }
    render() {
        return (
            <div className="react-app">
                <Title title={this.props.title} />
                <Contacts contacts={this.props.contactList.contacts} setContact={this.props.selectContact} />
                <ContactDetails contact={this.props.contact} />
            </div>
    )}
}

class Title extends React.Component {
    constructor (props) {
        super(props);
    }
    render() {
        return (
            <div className="contact-title">
                <h1>{this.props.title}</h1>
            </div>
    )}
}

class ContactItem extends React.Component {
    constructor (props) {
        super(props);
    }
    render() {
        var contactName = this.props.name.first + " " + this.props.name.last;
        var contactDob = this.props.dob.split(' ')[0];
        var contactPicture = this.props.picture.medium;
           return (
           <div id={"contact-" + this.props.id} onClick={this.props.selectContact}>
            <img src={contactPicture}></img>
            <div className="details">
                <p>{contactName}</p>
                <p>{contactDob}</p>
            </div>
           </div>
    )}
}

class Contacts extends React.Component {
    constructor (props) {
        super(props);
    }
    render() {
        var contactKey = 0;
        return (
            <ul className="contact-list">
            {this.props.contacts.map(item => {
             contactKey++; 
             return <ContactItem key={contactKey} selectContact={this.props.setContact} {...item}/>
            })}
            </ul>
    )}
}

class ContactDetails extends React.Component {
    constructor (props) {
        super(props);
    }
    render() {
        if (!this.props.contact) {
            return <div>Click on a contact to the left</div>
        } else {
            var fullName = capitalizeWords(this.props.contact.name.first + " " + this.props.contact.name.last);
            var age = calculateAge(this.props.contact.dob);
            return (
                <div className="contact-details">
                    <div className="row">
                        <h3>{fullName}</h3>
                        <img src={this.props.contact.picture.large}></img>
                    </div>
                    <div className="row">
                        <p>Gender: {this.props.contact.gender}</p>
                        <p>DOB: {this.props.contact.dob} Age: {age}</p>
                    </div>
                    <hr />
                    <div className="row">
                        <span>{this.props.contact.location.street}</span>
                        <span>{this.props.contact.location.city}, {this.props.contact.location.state} </span>
                        <span>{this.props.contact.location.postcode}</span>
                    </div>
                    <hr />
                    <div className="row">
                        <p>Email: {this.props.contact.email}</p>
                        <p>Phone: {this.props.contact.phone}</p>
                    </div>
                </div>
        )}        
    }
}

var state = {};
function setState(changes) {
    state = Object.assign({}, state, changes);
    
    state.selectContact = function (e) {
        var id = e.currentTarget.id.split("-")[1];
        location.hash = "#/contact/" + id;
        var contact = contacts.contacts.find(i => i.id == id);
        setState({ contact: contact });
    };

    // I know it's discouraged, but I'm not touching the body outside of this script
    ReactDOM.render(<App {...state} />, document.body);
}

window.addEventListener("hashchange", function () {
    if (location.hash.split("/").includes("contact")) {
        var id = location.hash.split("/");
        id = id[id.length - 1];
        var contact = contacts.contacts.find(i => i.id == id);
        setState({ contact: contact });
    }
});
var contact = null;
setState({ contactList: contacts, contact: contact, title: title });