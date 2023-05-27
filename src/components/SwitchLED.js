import React from 'react'
import Switch from '@mui/material/Switch';
import { useState } from 'react';
import { useEffect } from 'react';
import { getDatabase, ref, onValue, set} from "firebase/database";
import DB from '../Database/Firebase';


function SwitchLED() {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const db = getDatabase();
        const ledRef = ref(db,'LED/value');
        onValue(ledRef, (snapshot) => {
            const data = snapshot.val();
            setChecked(data);
        });
        
    }, []);

    const handleChange = () => {
        setChecked(!checked);
        set(ref(DB, 'LED/value'), !checked);
    };

    return (
        <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
        />
    )
}

export default SwitchLED