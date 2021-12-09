const fs = require('fs');
const { resolve } = require('path');

// Global funtions
function getAllDatas() {
    return JSON.parse(fs.readFileSync("config/dataBase.json"));
}

module.exports = {
    CHECK_USER: (data) => {
        return new Promise((resolve, reject) => {
            try {
                // checking if feilds are empty or not.
                if (data.email == false && data.password == false)
                    reject({ reason: "Email and password are empty" });
                if (data.email == false)
                    reject({ reason: "Email is empty" });
                if (data.password == false)
                    reject({ reason: "Password is empty" });
                
                // getting all the users and checking.
                let jsonData = getAllDatas().users;
                let user = jsonData.filter((user) => user.email === data.email)[0];
                
                // checkig if there is any user and if any matching the password.
                if (!user)
                    reject({ reason: "User not found" });
                if (user && user.password === data.password)
                    resolve(user);
                reject({ reason: "Wrong password." });
            } catch (err) {
                reject({ reason: err.message });
            }
        })
    },

    GET_BLOG: () => {
        return new Promise((resolve, reject) => {
            try {
                let data = getAllDatas().blogs
                resolve(data);
            } catch (err) {
                reject({ reason: "Somthing went wrong..." });
            }
        })
    }
}