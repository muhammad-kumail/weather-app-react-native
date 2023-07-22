import * as React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from 'react-native';
import styles from '../Theme/styles';
import {SearchBar} from 'react-native-elements';
import {geoLocation, searchRegion} from '../NetworkCalls/Search';
import axios from 'axios';
import {forecast} from '../NetworkCalls/Forecast';
import {weatherImages} from '../constants';
import {Image} from 'react-native';
import CityItem from '../components/cityItem';

export default function Home({navigation}) {
  const weatherBack = require('../assets/images/weatherback.jpg');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [regionArray, setRegionArray] = React.useState([]);
  const [currentLocation, setCurrentLocation] = React.useState(null);
  const [currentRegion, setCurrentRegion] = React.useState(null);
  const [forecastData, setForecastData] = React.useState([]);
  const [isKeyboard, setIsKeyboard] = React.useState(false);
  const source = React.useRef(null);
  const location = 'lahore';

  React.useEffect(() => {
    const onOpen = Keyboard.addListener('keyboardDidShow', () =>
      setIsKeyboard(true),
    );
    const onClose = Keyboard.addListener('keyboardDidHide', () =>
      setIsKeyboard(false),
    );
    return () => {
      onOpen.remove();
      onClose.remove();
    };
  }, []);

  React.useEffect(() => {
    if (searchQuery.length != 0) {
      if (source.current) {
        source.current.cancel('Previous request cancelled');
      }
      source.current = axios.CancelToken.source();
      searchRegion(searchQuery, source.current.token).then(res => {
        console.log('regions:', res.result);
        setRegionArray(res.result);
      });
    }
  }, [searchQuery]);

  React.useEffect(() => {
    return () => {
      if (source.current) {
        source.current.cancel('Component unmounted');
      }
    };
  }, []);
  const onForest = value => {
    forecast(value, '7')
      .then(res => {
        // console.log('Forcast:', JSON.stringify(res.result));
        setCurrentLocation(res.result?.location);
        setCurrentRegion(res.result?.forecast?.forecastday[0]);
        setForecastData(res.result?.forecast?.forecastday);
      })
      .catch(err => {
        console.log('Error:', err);
      });
  };
  React.useEffect(() => {
    geoLocation()
      .then(res => {
        console.log('Current Position:', res.result);
        onForest(res.result?.city);
      })
      .catch(err => {
        console.log(err.result);
        console.log(err.result?.response?.data);
        onForest(location);
      });
  }, []);

  return (
    <View style={styles.HomeContainer}>
      <ImageBackground source={weatherBack} style={styles.HomeImageBack}>
        <View style={styles.overlay} />
        <SearchBar
          placeholder="Search city/region/country"
          containerStyle={styles.searchBarContainerStyle}
          inputContainerStyle={styles.searchBarInputContainerStyle}
          inputStyle={styles.searchBarInputStyle}
          leftIconContainerStyle={styles.searchBarLeftIconContainerStyle}
          value={searchQuery}
          onChangeText={e => setSearchQuery(e)}
          round
        />
        {searchQuery.length != 0 ? (
          <View style={styles.searchResultStyle}>
            {regionArray.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    onForest(item?.name);
                    setRegionArray([]);
                    setSearchQuery('');
                  }}
                  style={styles.searchResultButton}>
                  <Text style={styles.searchResultText}>
                    {item?.name}, {item?.region}, {item?.country}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : null}
        <View
          style={[
            styles.homeCenterStyle,
            styles.setCenter,
            {justifyContent: 'space-around'},
          ]}>
          <Text style={styles.tempText}>
            {currentLocation?.name},{' '}
            <Text style={styles.title}>{currentLocation?.country}</Text>
          </Text>
          <Text style={styles.dayText}>
            {
              new Date(currentRegion?.date)
                .toLocaleDateString('en-US', {weekday: 'long'})
                .split(',')[0]
            }
          </Text>
          <Image
            source={weatherImages[currentRegion?.day?.condition?.text]}
            style={styles.imageStyle}
          />
          <Text style={styles.tempText2}>
            {currentRegion?.day?.avgtemp_c}&#176;
          </Text>
          <Text style={styles.title}>
            {currentRegion?.day?.condition?.text}
          </Text>
        </View>
        <View style={styles.homeBottomStyle}>
          {!isKeyboard ? (
            <>
              <Text style={styles.subHeading}>Daily forecast</Text>
              <FlatList
                horizontal
                data={forecastData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) =>
                  item.date != currentRegion?.date ? (
                    <CityItem
                      day={
                        new Date(item?.date)
                          .toLocaleDateString('en-US', {weekday: 'long'})
                          .split(',')[0]
                      }
                      image={weatherImages[item?.day?.condition?.text]}
                      temperature={item?.day?.avgtemp_c}
                      onPress={() => setCurrentRegion(item)}
                    />
                  ) : null
                }
              />
            </>
          ) : null}
        </View>
      </ImageBackground>
    </View>
  );
}
