
export function getUser(){
    return fetch("https://mysterious-ravine-04822.herokuapp.com/profile/", {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept":  "application/json", 
            "Authorization": 'bearer ' + localStorage.jwt
        }
    })
    .then(res => res.json())
    // .then(console.log("ls", localStorage.jwt))
}

export function getPost(){
    // const jwt = LS.get("jwt")
    return fetch("https://mysterious-ravine-04822.herokuapp.com/posts/", {
    method: 'GET',
    headers: {
         "Content-Type": "application/json",
         "accept":  "application/json", 
        //  'Authorization': `Bearer ${jwt}`
        }
    })
    .then(res => res.json())
    // .then(data  => console.log(data[0]["description"]))
    
}

// export function getProjects(){
//     return fetch("http://localhost:3000/userprojects/", {
//         method: 'GET',
//         headers: {
//             "Content-Type": "application/json",
//             "accept": "application/json",
//             'Authorization': `Bearer ${jwt}`
//         }
//     })
//     .then(res => res.json())
// }

export function getEvents(){
    return fetch("https://mysterious-ravine-04822.herokuapp.com/events/", {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
            'Authorization': 'bearer ' + localStorage.jwt
        }
    })
    .then(res => res.json())
}
export function getCollaboration(){
    return fetch("https://mysterious-ravine-04822.herokuapp.com/userprojects/", {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
            'Authorization': 'bearer ' + localStorage.jwt
        }
    })
    .then(res => res.json())
}

export function getMyCollaborations(){
    return fetch("https://mysterious-ravine-04822.herokuapp.com/collaborations/", {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
            'Authorization': 'bearer ' + localStorage.jwt
        }
    })
    .then(res => res.json())
}

export function getCollaborating(){
    return fetch("https://mysterious-ravine-04822.herokuapp.com/collaborating/", {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
            'Authorization': 'bearer ' + localStorage.jwt
        }
    })
    .then(res => res.json())
}
