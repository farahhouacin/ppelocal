import jsonwebtoken from 'jsonwebtoken'


export const getToken = async (user) => {
    try{
    let response = await fetch('http://localhost:3001/auth', {
        method:'POST',
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(user)
        })
        let {token} = await response.json()
        let decoded = jsonwebtoken.verify(token,'ppe')
        return {decoded,token}
    }catch(error){
        console.log(error)
        
    }
}
