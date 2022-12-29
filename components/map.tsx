import MapView, { Marker, Polyline } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import React from 'react'
import MapViewDirections from 'react-native-maps-directions';

const Map = () => {

    const coordinates = [
        {
            latitude: 56.191438,
            longitude: 40.492999
        },
        {
            latitude: 56.145726,
            longitude: 40.371370
        },
    ]
    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                initialRegion={{
                    latitude: 56.191438,
                    longitude: 40.492999,
                    latitudeDelta: 0.0,
                    longitudeDelta: 0.0,
                }}
            >
                {/* <MapViewDirections
                    origin={coordinates[0]}
                    destination={coordinates[1]}
                    apikey={"AIzaSyDWC0vKSbB2RYtHeVczxk45So0K4tU7uz4"} // insert your API Key here
                    strokeWidth={4}
                    strokeColor="#111111"
                /> */}
                <Marker
                    coordinate={{
                        latitude: 56.191438,
                        longitude: 40.492999
                    }}
                    title={"Суромна"}
                    description={"Суздальский р-он, п. Суромна"}
                />
                <Marker
                    coordinate={{
                        latitude: 56.145726,
                        longitude: 40.371370
                    }}
                    title={"ВлГУ"}
                    description={"ВлГУ, корпус 3"}
                />
                <Polyline
                    coordinates={coordinates}
                    strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                    strokeColors={['#7F0000']}
                    strokeWidth={6}
                />
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

export default Map