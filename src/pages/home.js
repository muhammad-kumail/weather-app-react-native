import * as React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import styles from '../Theme/styles';
import { SearchBar } from "react-native-elements";
import { searchRegion } from '../NetworkCalls/Search';
import axios from 'axios'
import { forecast } from '../NetworkCalls/Forecast';
import { weatherImages } from '../constants';
import { Image } from 'react-native';

export default function Home({ navigation }) {
    const weatherBack = require('../assets/images/weatherback.jpg')
    const [searchQuery, setSearchQuery] = React.useState('')
    const [regionArray, setRegionArray] = React.useState([])
    const [currentRegion, setCurrentRegion] = React.useState(null)
    const [forecastData, setForecastData] = React.useState([])
    const source = React.useRef(null)
    const location = 'lahore';

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
    const onForest = (value) => {
        forecast(value, '7').then(res => {
            console.log('Forcast:', JSON.stringify(res.result))
            setCurrentRegion(res.result?.current)
            setForecastData(res.result?.forecast?.forecastday)
        }).catch(err => {
            console.log("Error:", err)
        })
    }
    React.useEffect(() => {
        onForest(location)
    }, [])

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
                                <TouchableOpacity key={index} onPress={() => {
                                    onForest(item?.name);
                                    setRegionArray([])
                                }} style={styles.searchResultButton}>
                                    <Text style={styles.searchResultText}>{item?.name}, {item?.region}, {item?.country}</Text>
                                </TouchableOpacity>
                            );
                        })}

                    </View>
                    : null}
                <View style={[styles.homeCenterStyle, styles.setCenter, { justifyContent: 'space-around' }]}>
                    <Image source={weatherImages[currentRegion?.condition?.text]} style={styles.imageStyle} />
                    <Text style={styles.tempText}>{currentRegion?.temp_c}&#176;</Text>
                </View>
                <View style={styles.homeBottomStyle}>

                </View>

            </ImageBackground>
        </View>
    );
}
