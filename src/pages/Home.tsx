import { IonButton, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonPopover, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
import { useEffect, useState } from 'react';
import { getAllTrips, insertTrip } from '../DatabaseHandler';
import { Trip } from '../model/Trip';
import './Home.css';

const Home: React.FC = () => {
  const [presentAlert] = useIonAlert();
  const [nameOfTheTrip, setNameOfTheTrip] = useState('');
  const [date, setDate] = useState('');
  const [destination, setDestination] = useState('');
  const [description, setDescription] = useState('');
  const [personQuantity, setPersonQuantity] = useState('');
  const [transport, setTransport] = useState('');
  const [riskAssessment, setRiskAssessment] = useState('');
  const [picture, setPicture] = useState('');
  const [allTrips, setAllTrips] = useState<Trip[]>([]);


  
  const fetchData = async()=>{
    const allTrips = await getAllTrips()
    setAllTrips(allTrips)
  }
  const setDatePicker = (e: any) => {
    const mydate = new Date(e.detail.value);
    setDate(mydate.toLocaleDateString("en-VN"))
  }
  const saveData = async () => {
    const newTrip: Trip = {
      'name': nameOfTheTrip, 'date': date, 'destination': destination,
       'description': description,
      'personQuantity': personQuantity,
      'transport': transport,
      'risk': riskAssessment,
      'picture': picture
    };
    const result = await insertTrip(newTrip);
    if(result){
      alert('Insert done!')
      window.location.reload();
    }else{
      presentAlert({
        header: 'Error',
        subHeader: 'Insert Trip not Success',
        message: 'Can not insert because lack of information or Error!',
        buttons: ['OK'],
      })
    }
  }

  useEffect(()=>{
    fetchData()
  },[])
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle>Make a Trip </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
                
      <IonItem>
          <IonLabel position="floating">Name</IonLabel>
          <IonInput onIonChange={e => setNameOfTheTrip(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Date</IonLabel>
          <IonInput id='mydatepicker' value={date}></IonInput>
          <IonPopover keepContentsMounted={true} trigger='mydatepicker' triggerAction='click'>
            <IonContent>
              <IonDatetime onIonChange={e => setDatePicker(e)}></IonDatetime>
            </IonContent>
          </IonPopover>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Destination</IonLabel>
          <IonInput onIonChange={e => setDestination(e.detail.value!)}></IonInput>
        </IonItem>
        
        <IonItem>
          <IonLabel position="floating">Description</IonLabel>
          <IonInput onIonChange={e => setDescription(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Persosn Quantity</IonLabel>
          <IonInput onIonChange={e => setPersonQuantity(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Transport</IonLabel>
          <IonInput onIonChange={e => setTransport(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem>

          <IonLabel position="floating">Picture </IonLabel>
          <IonInput onIonChange={e => setPicture(e.detail.value!)}></IonInput>
        </IonItem>


        <IonItem>
          <IonLabel position="floating">Risk Assessment</IonLabel>
          <IonSelect onIonChange={e => setRiskAssessment(e.detail.value)}>
            <IonSelectOption value="Yes">Yes</IonSelectOption>
            <IonSelectOption value="No">No</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonButton onClick={saveData} expand='block' class='ion-margin'>Save</IonButton>
        <IonButton   routerLink={'/viewAllTrip'} expand='block' class='ion-margin' color="success" >View all Trip</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
