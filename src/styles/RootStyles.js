import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center'     
    },

    text: {
        alignSelf:"center",
        color:"#7C1F44",
        fontSize:30
    },

    text2: {
        marginHorizontal:55,
        textAlign:'center',
        marginTop:5,
        opacity:0.4
    },

    field1: {
        flexDirection:"row",
        alignItems:"center",
        marginHorizontal:55,
        borderWidth:2,
        marginTop:30,
        paddingHorizontal:10,
        borderColor:"#7C1F44",
        borderRadius:23,
        paddingVertical:2
    },

    login: {
        marginHorizontal:100,
        alignItems:"center",
        justifyContent:"center",
        marginTop:30,
        width: '50%',
        backgroundColor:"#7C1F44",
        paddingVertical:5,
        borderRadius:23
    },

    register: {
        alignItems:"center",
        justifyContent:"center",
        color:"#00716F",
        marginTop:10,
        marginHorizontal:100,
        paddingVertical:30       
    },

    input: {
        marginLeft: 10, 
        flex: 1, 
        alignSelf: 'center',
        height: 21,
        fontSize: 14,
        lineHeight: 14 
    },

    error: {
        color: 'red'
    }

})