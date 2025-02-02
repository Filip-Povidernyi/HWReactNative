import MapView, { Marker } from "react-native-maps";

import { StyleSheet, View } from "react-native";

const MapScreen = ({ navigation, route }) => {
    const location = route.params;
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={{
                    latitude: location?.latitude || 37.4220936,
                    longitude: location?.longitude || -122.083922,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    title="I am here"
                    coordinate={{
                        latitude: location?.latitude || 37.4220936,
                        longitude: location?.longitude || -122.083922,
                    }}
                    description="Hello"
                />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    map: {
        width: "100%",
        height: "100%",
    },
})

export default MapScreen;