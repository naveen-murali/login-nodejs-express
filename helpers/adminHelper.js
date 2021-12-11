const fs = require('fs');
const { resolve } = require('path');

// Global funtions
function getAllDatas() {
    try {
        return JSON.parse(fs.readFileSync("config/dataBase.json"));
    } catch (err) {
        throw "Could not complete the process.";
    }
}
function setAllData(data) {
    try {
        fs.writeFileSync("config/dataBase.json", JSON.stringify(data));
        return true;
    } catch (err) {
        throw "Couldn't resolve the data.";
    }
}

module.exports = {
    GET_USERS: () => {
        return new Promise((resolve, reject) => {
            try {
                let users = getAllDatas().users.map((user, index) => {
                    user.index = index + 1;
                    return user;
                });
                resolve(users);
            } catch (err) {
                reject({ reason: "Couldn't get the users." });
            }
        })
    },
    
    CHECK_ADMIN: (data) => {
        return new Promise((resolve, reject) => {
            try {
                // checking if feilds are empty or not.
                if (data.email == false && data.password == false)
                    reject({ reason: "Email and password are empty" });
                if (data.email == false)
                    reject({ reason: "Email is empty" });
                if (data.password == false)
                    reject({ reason: "Password is empty" });

                let admin = getAllDatas().admin;
                admin = admin.filter(element => element.email === data.email)[0];

                // checkig if there is any user and if any matching the password.
                if (!admin)
                    reject({ reason: "User not found" });
                if (admin && admin.password === data.password)
                    resolve(admin);
                reject({ reason: "Wrong password." });
           } catch (err) {
                reject({ reason: err.message });
           } 
        });
    },

    ADD_USER: (user) => {
        return new Promise((resolve, reject) => {
            try {
                let data = getAllDatas();

                delete user.confirmPassword;
                data.users.push(user);
                
                setAllData(data);
                resolve({ message: `${user.email} is created.` });
            } catch (err) {
                reject({ message: err.message });
            }

        })
    },

    DELETE_USER: (email) => {
        return new Promise((resolve, reject) => {
            try {
                let data = getAllDatas();
                let user = data.users.filter((usr) => usr.email === email);

                if (user)
                    data.users = data.users.filter((usr) => usr.email !== email);
                
                let status = setAllData(data);
                if (status)
                    resolve({ message: `${email} deleted` });
                else
                    reject({ message: "Failed to deleted." });
            } catch (err) {
                reject({ message: "Failed to deleted." });
            }
        })
    }
}