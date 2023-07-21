import Theme, { normalized } from ".";

const { StyleSheet } = require("react-native");

export default styles = StyleSheet.create({
    HomeContainer: {
        flex: 1,
    },
    HomeImageBack: {
        height: '100%',
        width: '100%'
    },
    setCenter: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchBarContainerStyle: { flex: 1, backgroundColor: 'transparent', borderBottomWidth: 0, borderTopWidth: 0 },
    searchBarInputContainerStyle: { backgroundColor: Theme.colors.dimWhite },
    searchBarInputStyle: { fontSize: Theme.fontSizes.small, color: Theme.colors.black },
    searchBarLeftIconContainerStyle: { paddingLeft: normalized.width(2) },
    homeCenterStyle: {
        flex: 9,
        borderBottomWidth: 1,
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
        alignSelf: 'center'
    },
    searchResultText: {
        fontSize: Theme.fontSizes.medium,
        color: Theme.colors.black
    },
    searchResultButton: {
        padding: normalized.width(1.5),
        paddingHorizontal: normalized.width(3),
    },
    tempText: {
        fontSize: Theme.fontSizes.big,
        color: Theme.colors.white,
    },
    imageStyle: {
        height: normalized.height(15),
        width: normalized.height(15)
    }

});