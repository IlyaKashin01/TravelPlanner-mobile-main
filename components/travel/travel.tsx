import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCoordinate } from '../../api/hooks/useCoordinates';
import { useService } from '../../api/hooks/useService';

export interface Props {
    id?: number;
    name?: string;
    description?: string;
    dateS?: Date;
    dateE?: Date;
}

const Travel: React.FC<Props> = ({ id, name, description, dateE, dateS }) => {
    const { setJourneyId } = useCoordinate();
    const { setTravelId } = useService();
    const navigation = useNavigation<StackNavigationProp<any>>();
    const click = (key) => { setJourneyId(key); setTravelId(key); navigation.navigate('travelInfo') }
    return (
        <Pressable onPress={() => click(id)}>
            <View style={styles.container} key={id}>
                <Text style={styles.text}>{id}-{name}</Text>
                <View >
                    <Text style={{ fontSize: 18 }}>{description}</Text>
                </View>

                <View>
                    <Text style={{ fontSize: 18, alignItems: "center", justifyContent: "center" }}>{dateS.toString()} - {dateE.toString()}</Text>
                </View>
            </View>
        </Pressable>
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