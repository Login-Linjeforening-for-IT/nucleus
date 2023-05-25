import { createSlice } from "@reduxjs/toolkit";     // Imports slicer

export const ProfileSlice = createSlice({              // Declares Profile Slice
    name: 'profile',                                // Slice name
    initialState: {                                 // Initial state
        id: null,
        ban: null,
        joinedevents: null,
        name: null,                          
        allergies: null,
        preferences: null,
        mail: null,
        schoolyear: null,
        degree: null,
        image: null
    },
    reducers: {                                     // Declares slice reducer
        setID: (state, action) => {    
            state.id = action.payload        
        },
        setName: (state, action) => {       
            state.name = action.payload      
        },
        setAllergies: (state, action) => {    
            state.allergies = action.payload        
        },
        setPreferences: (state, action) => {    
            state.preferences = action.payload        
        },
        setMail: (state, action) => {    
            state.mail = action.payload        
        },
        setBan: (state, action) => {    
            state.ban = action.payload        
        },
        setJoinedevents: (state, action) => {    
            state.joinedevents = action.payload        
        },
        setSchoolyear: (state, action) => {    
            state.schoolyear = action.payload        
        },
        setDegree: (state, action) => {
            state.degree = action.payload
        },
        setImage: (state, action) => {
            state.image = action.payload
        }
    }
})

export const { 
    setID, 
    setName,
    setAllergies, 
    setPreferences, 
    setMail, 
    setJoinedevents, 
    setSchoolyear, 
    setDegree,
    setImage
} = ProfileSlice.actions  // Exports redurcers

export default ProfileSlice.reducer                    // Exports the profile slice