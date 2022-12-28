import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export interface Props {
    id?: number;
    name?: string;
    description?: string;
    dateS?: Date;
    dateE?: Date;
}

const Travel: React.FC<Props> = ({ id, name, description, dateE, dateS }) => {
    return (
        <View style={styles.container} key={id}>
            <Text style={styles.text}>{id}-{name}</Text>
            <View >
                <Text style={{ fontSize: 18 }}>{description}</Text>
            </View>

            <View>
                <Text style={{ fontSize: 18, alignItems: "center", justifyContent: "center" }}>{dateS.toString()} - {dateE.toString()}</Text>
            </View>
        </View>
    )
}

export default Travel

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 25,
        alignItems: 'center',
        width: 325,
        height: 'auto',
        padding: 15,
        justifyContent: 'center',
        marginTop: 15,
        marginRight: 15,
        marginLeft: 15,
    },
    text: {
        color: "#52575D",
        fontSize: 28
    },

});