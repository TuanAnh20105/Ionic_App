import { IonImg,IonBackButton, IonThumbnail, IonButton, IonButtons, IonContent,IonList,IonToolbar, IonHeader, IonItem, IonLabel, IonPage, IonRouterLink, IonTitle  } from '@ionic/react';
import { useEffect, useState } from 'react';
import { deleteTripAll, getAllTrips } from '../DatabaseHandler';
import { Trip } from '../model/Trip';
import './Home.css';


const ViewAllTrip: React.FC = () => {
  const [allTrips, setAllTrips] = useState<Trip[]>([]);
  const handlerOfDelete = async () =>{
    const res = await deleteTripAll();
    window.location.reload();
}

const fetchData = async () => {
    const listTrip = await getAllTrips()
    setAllTrips(listTrip)
}
  

  useEffect(() => {
      fetchData()
  }, [])

  return (
      <IonContent>
          <IonPage>
              <IonHeader>
                  <IonToolbar color="red">
                  <IonButtons slot="start">
                      <IonBackButton defaultHref="home" color="blue" text="<<" icon="buttonIcon" />
                  </IonButtons>
                      <IonTitle>List Of Trips </IonTitle>
                  </IonToolbar>
              </IonHeader>
              <IonContent>
                  <IonItem>
                      <IonList>
                          {allTrips.map(t =>
                              <IonItem key={t.id}>
                                  <IonThumbnail slot='start'>
                                      <IonImg src={t.picture}></IonImg>
                                  </IonThumbnail>
                                  <IonLabel>
                                      <IonRouterLink routerLink={'/TripDetail/'+ t.id}>                                      
                                      <IonLabel > Name: {t.name}; Date: {t.date}; 
                                      Description: {t.description}; Destination: {t.destination};
                                       PersonQuantity: {t.personQuantity}; Transport: {t.transport} 
                                       ; Risk: {t.risk}</IonLabel></IonRouterLink>
                                  </IonLabel>
                              </IonItem>
                          )}
                      </IonList>
                  </IonItem>
              </IonContent>
              <IonButton routerLink={'/viewAllTrip'} onClick={handlerOfDelete} class='ion-margin'>Remove All</IonButton>
          </IonPage >
      </IonContent>
      
  );
};

export default ViewAllTrip;
