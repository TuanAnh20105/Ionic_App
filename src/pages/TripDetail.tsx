import {IonToolbar, IonBackButton, IonButton,IonTitle, IonButtons, IonContent, IonPage,IonHeader, IonInput,IonLabel, IonItem } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { deleteTripById, getTripById } from '../DatabaseHandler';
import { Trip } from '../model/Trip';
import './Home.css';


interface IdParam {
    id: string
}

const TripDetail: React.FC = () => {
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [nameOfTrip, setNameOfTrip] = useState('');
    const [description, setDescription] = useState('');
    const [personQuantity, setPersonQuantity] = useState('');
    const [transport, setTransport] = useState('');
    const [risk, setRisk] = useState('');
    const [picture, setPicture] = useState('');
    const { id } = useParams<IdParam>()

    const fetchDataFromDB = async () => {
        try{
            const trip = await getTripById(Number.parseInt(id)) as Trip
            setDestination(trip.destination)
            setNameOfTrip(trip.name)
            setDate(trip.date)
            setRisk(trip.risk)
            setDescription(trip.description)
            setTransport(trip.transport)
            setPersonQuantity(trip.personQuantity)
            setPicture(trip.picture)
        }
        catch (e){
            console.log(e)
        }
        
    }



    useEffect(() => {
        fetchDataFromDB()
    })
    let [upDescription, setDes] = useState('');

    const handlerOfDelete = async () =>{
        const res = await deleteTripById(Number.parseInt(id));
        window.location.reload();
    }
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="red" >
                     <IonButtons slot="start">
                        <IonBackButton defaultHref="/viewAllTrip" color="blue" text="<<<" icon="buttonIcon" />
                    </IonButtons>
                    <IonTitle>Detail Of Trip </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            <IonItem>
                    <IonLabel position="floating">Name Of Trip</IonLabel>
                    <IonInput disabled value={nameOfTrip}></IonInput>
             </IonItem>
             <IonItem>
                    <IonLabel position="floating">Date</IonLabel>
                    <IonInput disabled id='mydatepicker' value={date}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Destination</IonLabel>
                    <IonInput disabled value={destination}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Description</IonLabel>
                    <IonInput disabled value={description} onIonChange={e => setDes(e.detail.value!)}></IonInput>
                </IonItem>
                <IonItem>
          <IonLabel position="floating">Persosn Quantity</IonLabel>
          <IonInput disabled value={personQuantity}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Transport</IonLabel>
          <IonInput disabled value={transport}></IonInput>
        </IonItem>
        <IonItem>

          <IonLabel position="floating">Picture </IonLabel>
          <IonInput disabled value={picture}></IonInput>
        </IonItem>

                <IonItem>
                    <IonLabel position="floating">Risk Assessment</IonLabel>
                    <IonInput disabled value={risk}></IonInput>
                </IonItem>

                <IonButton routerLink={'/viewAllTrip'} onClick={handlerOfDelete} class='ion-margin'>Remove</IonButton>
            </IonContent>
        </IonPage>
    );
};
export default TripDetail;