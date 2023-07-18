import * as React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import styles from '../Theme/styles';
import { SearchBar } from "react-native-elements";
import { searchRegion } from '../NetworkCalls/Search';
import axios from 'axios'

export default function Home({ navigation }) {
    const weatherBack = require('../assets/weatherback.jpg')
    const [searchQuery, setSearchQuery] = React.useState('')
    const [regionArray, setRegionArray] = React.useState([])
    const source = React.useRef(null)

    React.useEffect(() => {
        if (searchQuery.length != 0) {
            if (source.current) {
                source.current.cancel('Previous request cancelled');
            }
            source.current = axios.CancelToken.source();
            searchRegion(searchQuery, source.current.token)
                .then(res => {
                    console.log("regions:", res.result)
                    setRegionArray(res.result)
                })
        }
    }, [searchQuery])

    React.useEffect(() => {
        return () => {
            if (source.current) {
                source.current.cancel('Component unmounted');
            }
        };
    }, []);

    return (
        <View style={styles.HomeContainer}>
            <ImageBackground source={weatherBack} style={styles.HomeImageBack}>
                <SearchBar
                    containerStyle={styles.searchBarContainerStyle}
                    inputContainerStyle={styles.searchBarInputContainerStyle}
                    inputStyle={styles.searchBarInputStyle}
                    leftIconContainerStyle={styles.searchBarLeftIconContainerStyle}
                    value={searchQuery}
                    onChangeText={(e) => setSearchQuery(e)}
                    round
                />
                {searchQuery.length != 0 ?
                    <View style={styles.searchResultStyle}>
                        {regionArray.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => console.log('eheell')} style={styles.searchResultButton}>
                                    <Text style={styles.searchResultText}>{item?.region}, {item?.country}</Text>
                                </TouchableOpacity>
                            );
                        })}

                    </View>
                    : null}
                <View style={[styles.homeCenterStyle, styles.setCenter]}>

                </View>
                <View style={styles.homeBottomStyle}>

                </View>

            </ImageBackground>
        </View>
    );
}
