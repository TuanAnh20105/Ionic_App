import {openDB} from 'idb'
import { Trip } from './model/Trip'

const DATABASE_NAME = "M_Expense"
async function createDatabase() {
    const db = await openDB(DATABASE_NAME,1,{
        upgrade(db){
            const database = db.createObjectStore('trips',{
                keyPath: 'id',
                autoIncrement:true
            })
        }
    })
}

createDatabase().then(()=>{
    console.log("Success!")
})

export const insertTrip = async (inforOfTrip:Trip)=>{
    if( inforOfTrip.date.trim().length === 0 || inforOfTrip.name.trim().length === 0 ||
        inforOfTrip.destination.trim().length === 0 || inforOfTrip.risk.trim().length === 0 
        ||inforOfTrip.personQuantity.trim().length === 0|| inforOfTrip.transport.trim().length === 0 ){
            return false;
    }
    else{
        const db = await openDB(DATABASE_NAME,1)
        const key = await db.put("trips",inforOfTrip)
        console.log("inserted successful of Trip "+ key)
        return true;
    }
}

export const getTripById = async (id:number) => {
    const db = await openDB(DATABASE_NAME,1)
    return await db.get("trips",id)
}
export const deleteTripAll = async () => {
    const db = await openDB(DATABASE_NAME,1)
    return await db.clear("trips");
}
export const getAllTrips = async () => {
    const db = await openDB(DATABASE_NAME,1)
    return await db.getAll("trips")
}

export const deleteTripById = async (id:number) => {
    const db = await openDB(DATABASE_NAME,1)
    return await db.delete("trips",id)
}




