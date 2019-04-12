import NetInfo from "@react-native-community/netinfo";

const eventName = 'connectionChange';

//Get Info
async function GetConnectionInfo(){
    const connectionInfoNetInfo = await NetInfo.getConnectionInfo();
    return connectionInfo;
}

//Default Listener
let listener = connectionInfo => {
  console.log("Connection type", connectionInfo.type);
  console.log("Connection effective type", connectionInfo.effectiveType);
};
const NetInfoManager = {
    // Subscribe
    addListener(callback) {
        listener = callback ? callback : listener;
        NetInfo.addEventListener(eventName, listener);
    },
    // Unsubscribe
    removeListener() {
        NetInfo.removeEventListener(eventName, listener);
    }
}
export {
    GetConnectionInfo,
    NetInfoManager
}