import Theme, {normalized} from '.';

const {StyleSheet} = require('react-native');

export default styles = StyleSheet.create({
  HomeContainer: {
    flex: 1,
  },
  HomeImageBack: {
    height: '100%',
    width: '100%',
  },
  setCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBarContainerStyle: {
    flex: 1,
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  searchBarInputContainerStyle: {
    backgroundColor: Theme.colors.dimWhite,
  },
  searchBarInputStyle: {
    fontSize: Theme.fontSizes.small,
    color: Theme.colors.black,
  },
  searchBarLeftIconContainerStyle: {
    paddingLeft: normalized.width(2),
  },
  homeCenterStyle: {
    flex: 7,
  },
  homeBottomStyle: {
    flex: 3,
  },
  searchResultStyle: {
    zIndex: 1,
    position: 'absolute',
    top: normalized.height(8),
    borderRadius: 10,
    width: normalized.width(95),
    backgroundColor: Theme.colors.dimWhite,
    elevation: 5,
    marginVertical: normalized.width(2),
    alignSelf: 'center',
  },
  searchResultText: {
    fontSize: Theme.fontSizes.medium,
    color: Theme.colors.black,
  },
  searchResultButton: {
    padding: normalized.width(1.5),
    paddingHorizontal: normalized.width(3),
  },
  tempText: {
    fontSize: Theme.fontSizes.big,
    color: Theme.colors.white,
  },
  tempText2: {
    fontSize: Theme.fontSizes.xxbig,
    color: Theme.colors.white,
  },
  imageStyle: {
    height: normalized.height(20),
    width: normalized.height(20),
  },
  title: {
    color: Theme.colors.dimWhite,
    fontSize: Theme.fontSizes.xxmedium,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  cityItem: {
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: normalized.height(1),
    marginVertical: normalized.height(2.5),
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 10,
    padding: normalized.height(1.5),
    paddingHorizontal: normalized.height(1),
    width: normalized.height(13),
  },
  cityItemImage: {
    height: normalized.height(8),
    width: normalized.height(8),
  },
  cityItemText: {
    color: Theme.colors.dimWhite,
    fontSize: Theme.fontSizes.verySmall,
  },
  cityTempText: {
    color: Theme.colors.dimWhite,
    fontSize: Theme.fontSizes.medium,
  },
  subHeading: {
    marginHorizontal: normalized.height(1.5),
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.medium,
  },
  dayText: {
    color: Theme.colors.dimWhite,
    fontSize: Theme.fontSizes.medium,
  },
});
