import React, { Component } from 'react';
import { ListView } from 'react-native-elements';
import { FlatList, View, Text, ScrollView} from 'react-native'


class About extends Component {
    constructor(props) {
        super(props);

    }

    static navigationOptions = {
        title: 'About Us'
    };


    render() {
        return(
            <ScrollView>

            </ScrollView>
        );
    }
}

export default About;