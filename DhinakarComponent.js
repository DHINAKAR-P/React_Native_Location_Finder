import React, { Component } from 'react';
import { Text, View } from 'react-native';



export  class DhinakarComponent extends Component {
 

    render() {
        return (
            <View>
                <Text  >

                    {this.props.name}

                </Text>
            </View>
        )
    }


}
// export default DhinakarComponent;