import * as React from "react";
import { View } from "react-native";
import { SearchBar } from "react-native-elements";
import Theme from "../Theme";

export default function CustomeSearchBar({containerStyle, inputContainerStyle,inputStyle,onChangeText,value,defaulValue}) {
    return(
            <SearchBar 
                containerStyle={[{backgroundColor: 'transparent',borderBottomWidth: 0,borderTopWidth: 0},containerStyle]}
                inputContainerStyle={inputContainerStyle}
                inputStyle={inputStyle}
                defaultValue={defaulValue?defaulValue: ''}
                value={value}
                onChangeText={onChangeText}
                lightTheme
            />
    );
}