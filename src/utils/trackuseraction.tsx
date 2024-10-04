import EncryptedStorage from "react-native-encrypted-storage";


type ActionType = 'IMP' | 'CLK' | 'CNV'
export const UserActionTrack = async (user_id: string, campaign_id: string, action: ActionType) => {
    try{
        const access_token = await EncryptedStorage.getItem('access_token');
        if (!access_token) {
            throw new Error('Access token not found');
        }
        const response = await fetch('https://backend.appstorys.com/api/v1/users/track-action/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            body: JSON.stringify({
                campaign_id,
                user_id,
                action
            }),
        });
        if(!response.ok){
            throw new Error('Something went wrong');
        }
    } catch (error) {
        console.log(error);
    }
}