import React, { Component } from 'react'
import { Text, View,ImageBackground } from 'react-native'
import {
    DotIndicator,
    BallIndicator,
} from 'react-native-indicators';
export class Loading extends Component {
    render() {
        var imagebackgroud = {
            uri: "https://redpithemes.com/Documentation/assets/img/page_bg/page_bg_blur02.jpg"
        };
        return (
            <ImageBackground source={imagebackgroud} style={{ width: '100%', height: '100%' }} >
                <BallIndicator color='white' />
            </ImageBackground>
        )
    }
}

export default Loading
