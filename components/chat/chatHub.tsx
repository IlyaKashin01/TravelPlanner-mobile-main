import React, { useEffect, useState } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import signalr from 'react-native-signalr';
import { API_HOST } from '../../api/apiHost';


const ChatHub: React.FC = () => {
    const connection = signalr.hubConnection(`${API_HOST}chatHub`);
    connection.logging = true;

    const proxy = connection.createHubProxy('chatHub');
    //receives broadcast messages from a hub function, called "helloApp"
    proxy.on('helloApp', (argOne, argTwo, argThree, argFour) => {
        console.log('message-from-server', argOne, argTwo, argThree, argFour);
        //Here I could response by calling something else on the server...
    });

    // // atempt connection, and handle errors
    // connection.start().done(() => {
    //     console.log('Now connected, connection ID=' + connection.id);

    //     proxy.invoke('helloServer', 'Hello Server, how are you?')
    //         .done((directResponse) => {
    //             console.log('direct-response-from-server', directResponse);
    //         }).fail(() => {
    //             console.warn('Something went wrong when calling server, it might not be up and running?')
    //         });

    // }).fail(() => {
    //     console.log('Failed');
    // });

    //connection-handling
    connection.connectionSlow(() => {
        console.log('We are currently experiencing difficulties with the connection.')
    });

    connection.error((error) => {
        const errorMessage = error.message;
        let detailedError = '';
        if (error.source && error.source._response) {
            detailedError = error.source._response;
        }
        if (detailedError === 'An SSL error has occurred and a secure connection to the server cannot be made.') {
            console.log('When using react-native-signalr on ios with http remember to enable http in App Transport Security https://github.com/olofd/react-native-signalr/issues/14')
        }
        console.debug('SignalR error: ' + errorMessage, detailedError)
    });

    const sendMessage = async (message: string) => {
        connection.start()
            .then(() => console.log('SignalR Connected'))
            .catch((err) => console.log('SignalR Connection Error: ', err));
        if (connection) {
            const result = await connection.invoke('SendMessage', 2, message);
            console.log(result);
        }
    };

    return (
        <View>
            <TouchableOpacity onPress={() => sendMessage('Hello World')}>
                <Text>Send Message!</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ChatHub;