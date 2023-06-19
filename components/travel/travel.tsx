import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCoordinate } from '../../api/hooks/useCoordinates';
import { useService } from '../../api/hooks/useService';
import { useTravel } from '../../api/hooks/useTravel';

export interface Props {
    id?: number;
    name?: string;
    description?: string;
    dateS?: Date;
    dateE?: Date;
    expectedCost: any;
    actualCost: any;
    projectedCost: any;
}

const Travel: React.FC<Props> = ({ id, name, description, dateE, dateS, expectedCost, actualCost, projectedCost }) => {
    const { setJourneyId } = useCoordinate();
    const { setTravelId } = useService();
    const { getTravel } = useTravel();
    const navigation = useNavigation<StackNavigationProp<any>>();
    const click = (key) => {
        setJourneyId(key); setTravelId(key); getTravel(key), navigation.navigate('travelInfo')
    }
    return (
        <Pressable onPress={() => click(id)}>
            <View style={styles.container} key={id}>
                <Text style={styles.text}>{name}</Text>
                <View >
                    <Text style={{ fontSize: 18 }}>{description}</Text>
                </View>

                <View>
                    <Text style={{ fontSize: 18, alignItems: "center", justifyContent: "center" }}>{dateS.toString()} - {dateE.toString()}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={{ flexDirection: "column", paddingRight: 5, }}>
                        <Text style={{ fontSize: 10, alignItems: "center", justifyContent: "center" }}>Предполагаемая</Text>
                        <Text style={{ fontSize: 18, alignItems: "center", justifyContent: "center" }}>{expectedCost}</Text>
                    </View>
                    <View style={{ flexDirection: "column", borderLeftWidth: 1, borderColor: "blue", paddingLeft: 5, paddingRight: 5, }}>
                        <Text style={{ fontSize: 10, alignItems: "center", justifyContent: "center" }}>Фактическая</Text>
                        <Text style={{ fontSize: 18, alignItems: "center", justifyContent: "center" }}>{actualCost}</Text>
                    </View>
                    <View style={{ flexDirection: "column", borderLeftWidth: 1, borderColor: "blue", paddingLeft: 5 }}>
                        <Text style={{ fontSize: 10, alignItems: "center", justifyContent: "center" }}>Прогнозная</Text>
                        <Text style={{ fontSize: 18, alignItems: "center", justifyContent: "center" }}>{projectedCost}</Text>
                    </View>
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