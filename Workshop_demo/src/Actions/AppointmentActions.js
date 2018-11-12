import * as firebase from "firebase";

// Count User Api 
export const addCountAppointment = (count) => {

    return new Promise((resolve, reject) => {
        firebase.database().ref(`counts/`).update({ totalRepairAppointment: count }).then((res) => {
            resolve('Add count Successfully')
        }).catch((err) => {
            reject(err)
        })
    })
}
// Get  Count Api 
export const getCountAppointment = () => {

    return new Promise((resolve, reject) => {
        firebase.database().ref(`counts/`).child('totalRepairAppointment').once('value', (snapshot) => {
            resolve(snapshot.val())
        }, function (err) {
            reject(err);
        })
    })
}


export const addAppointmentData = (userId, data) => {
    return new Promise((resolve, reject) => {
        firebase.database().ref('repairAppointment/').push().then((insertedKey) => {
            data['key'] = insertedKey.key;
            firebase.database().ref(`repairAppointment/${insertedKey.key}`).set(data).then(function () {
                resolve("success");
            }, function (err) {
                reject(err);
            });
        })

    })
}



export const getAppointmentList = (userId) => {
    return new Promise((resolve, reject) => {
        firebase.database().ref(`repairAppointment/`).orderByChild('uid').equalTo(userId).on('value', (snapshot) => {

            let repairArr = []

            if (snapshot.exists()) {
                snapshot.forEach((element, index) => {

                    let value = element.val()
                    repairArr.push(value)

                })
                if (repairArr && repairArr.length > 0) {

                    resolve(repairArr)
                }
                else {

                    resolve(repairArr)
                }
            }
            else {
                resolve(repairArr)
            }

        }, (error) => {
            console.log(error, "error occur")
            reject(error)
        })

    })
}

export const editAppointments = (appointment) => {
    return new Promise((resolve, reject) => {
        firebase.database().ref('repairAppointment/' + appointment.key).update(appointment).then((res) => {
            resolve("success");
        }, function (err) {
            reject(err);
        })
    })
}


export const deleteAppointments = (key) => {
    return new Promise((resolve, reject) => {
        firebase.database().ref(`repairAppointment/` + key).remove().then((res) => {
            resolve("success");
        }, function (err) {
            reject(err);
        })
    })
}




export const getUserInfomation = () => {
    let data = {};
    let uid = '_qweqwe23423533453455';
    
    // let uid = firebase.auth().currentUser.uid;
    return new Promise((resolve, reject) => {

        firebase.database().ref().child("/users/" + uid).on('value', (snapshot) => {

            console.log(snapshot.val())
            if (snapshot.exists()) {
                let value = snapshot.val()
                data = value;
                resolve(data)
                console.log(data)

            }
            else {
                resolve(data)

            }
        }, (err) => {
            console.log(err)
            reject(err)
        })
    })

}

