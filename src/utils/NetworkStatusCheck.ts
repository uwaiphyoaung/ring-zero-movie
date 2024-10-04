import { useEffect, useState } from "react"
import NetInfo from '@react-native-community/netinfo';

export const networkStatusCheck = () => {
    const [isConntect, setIsConnected] = useState(true);
    useEffect(()=> {
        const unsubscribe = NetInfo.addEventListener((state)=> {
            setIsConnected(state.isConnected??false);
        });

        return () => unsubscribe();
    }, []);

    return isConntect;
}