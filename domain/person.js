// _-//TypicalDoofus\\-_
// Person class
//

class Person {

    //Consttructor for person
    constructor(firstname, lastname){
        this._firsname = firstname;
        this._lastname = lastname;
    }

    //Getter for firstname
    getfirstname(){
        return this._firsname;
    }

    //getter for lastname
    getlastname(){
        return this._lastname
    }
}

//Make person available to other classes
module.exports = Person;

