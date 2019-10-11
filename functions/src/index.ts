import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const firestore = admin.firestore();

/**
 * FUTURE:
 * - Implement frontend for CRUD operations into website
 * 
 * TODO:
 * 1. Add team member
 * 2. Add event
 * 3. Remove team member
 * 4. Remove event
 * 5. Update team member (id)
 * 6. Update event (id)
 */ 
export const getTeam = functions.https.onRequest(async (request, response) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Methods', 'GET');

    const res = await firestore.collection('current')
        .orderBy('order', 'asc').get()
        .then(d => d.docs.map(item => item.data()));
    return response.json(res);
});

export const getEvents = functions.https.onRequest(async (request, response) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Methods', 'GET');

    response.set('Access-Control-Allow-Origin', '*');
    const res = await firestore.collection('events').get()
        .then(d => d.docs.map(item => item.data()));
    return response.json(res);
});

export const addMember = functions.https.onRequest(async (request, response) => {
    const req = request.body; // JSON object
    
    return await firestore.collection("current").add(req).then(() => response.status(200).json("Added member!"));
    //const proc = await firestore.collection("current").add(req).then((r) => console.log(r));
    //return response.json(req);
});

export const addEvent = functions.https.onRequest(async (request, response) => {
    const req = request.body;

    return await firestore.collection("events").add(req).then(() => response.status(200).json("Added event!"))
                    .catch(err => response.json("Error: " + err));
});
